import { Injectable } from '@nestjs/common';
import { FileDto } from '../dto/files-tree.dto';
import nodeHtmlToImage from 'node-html-to-image';
import * as path from 'path';
import { path as rootPath } from 'app-root-path';
import { v4 as uuidv4 } from 'uuid';
import * as looksSame from 'looks-same';
import { ensureDir, remove } from 'fs-extra';
import { FilesHelper } from 'src/utils/files-helper';

@Injectable()
export class ImageService {
  async generateFromFiles(files: FileDto[], savePath: string) {
    let html = files.find((f) => f.label.includes('html'))?.content;
    const css = files.find((f) => f.label.includes('css'))?.content;

    if (!html) {
      return;
    }
    if (css) {
      html = html.replace('<head>', `<head><style>${css}</style>`);
    }

    html = await this.insertImagesToHtml(html, savePath);

    await this.generateFromHtml(html, path.join(savePath, 'image.png'));
  }

  async generateFromHtml(html: string, savePath: string) {
    await nodeHtmlToImage({
      output: savePath,
      html,
      puppeteerArgs: {
        args: ['--no-sandbox'], //TODO небезопасно, в проде нужно настраивать без этого флага
      },
    });
  }

  async compareWithHtml(html: string, imagePath: string) {
    const imgPath = path.join(rootPath, 'src', 'generated');
    const imgName = `${uuidv4()}.png`;
    await ensureDir(imgPath);
    html = await this.insertImagesToHtml(html, imagePath);
    await this.generateFromHtml(html, path.join(imgPath, imgName));
    const { equal } = await looksSame(
      path.join(imgPath, imgName),
      path.join(imagePath, 'image.png'),
    );
    await remove(path.join(imgPath, imgName));

    return equal;
  }

  async insertImagesToHtml(html: string, imagesDir: string) {
    const imageNames = html
      .match(/<img(.*?)\/>/gi)
      .map((img) =>
        img.replace(/^<img.+src=['"]/, '').replace(/['"].*\/>$/, ''),
      );

    await Promise.all(
      imageNames.map(async (name) => {
        const base64Image = await FilesHelper.readFileBase64(
          path.join(imagesDir, name),
        );
        const dataURI = 'data:image/jpeg;base64,' + base64Image;

        html = html.replaceAll(name, dataURI);
      }),
    );

    return html;
  }
}
