import * as path from 'path';
import { path as rootPath } from 'app-root-path';
import { ensureDir, writeFile, remove } from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';
import * as files from 'fs';

export class FilesHelper {
  static async uploadFilesWithReplace(
    files: Express.Multer.File[],
    contentToReplace: string,
    pathArr: string[] = ['static'],
  ) {
    const uploadFolder = path.join(rootPath, 'src', ...pathArr);
    await ensureDir(uploadFolder);
    await Promise.all(
      files.map(async (f, index) => {
        const [, ext] = f.originalname.split('.');
        const fileName = `${uuidv4()}.${ext}`;
        await writeFile(path.join(uploadFolder, fileName), f.buffer);
        contentToReplace = contentToReplace.replace(
          new RegExp(`src="${index}"`),
          `src="/static/${fileName}"`,
        );
      }),
    );

    return contentToReplace;
  }

  static async removeFiles(fileNames: string[]) {
    await Promise.all(
      fileNames.map(async (f) => {
        try {
          await remove(
            path.join(rootPath, 'src', ...f.replace(/^\//, '').split('/')),
          );
        } catch {
          console.log(`Файл ${f} не найден`);
        }
      }),
    );
  }

  static async removeFilesFromContent(content: string) {
    const fileNames = content.match(/img src=".+"/g);
    if (!fileNames?.length) {
      return;
    }

    const clearedFileNames = Array.from(fileNames).map((fn) => {
      return fn.replace('img src="', '').replace(/"$/, '');
    });

    await FilesHelper.removeFiles(clearedFileNames);
  }

  static setImgBackUrl(content: string): string {
    const fileNames = content.match(/img src=".+"/g);
    if (!fileNames?.length) {
      return content;
    }

    fileNames.forEach((fn) => {
      const newFn = fn.replace('img src="', `img src="${process.env.BACK_URL}`);
      content = content.replaceAll(fn, newFn);
    });

    return content;
  }

  static async getFiles(
    dir: string,
    parentFolder = 'tasks',
  ): Promise<string[]> {
    const currPath = path.join(rootPath, 'src', parentFolder, dir);
    const resultFiles = [];
    files.readdirSync(currPath).forEach((el) => {
      const isDir = el.split('.').length === 1;
      if (isDir) {
        return;
      }

      resultFiles.push(el);
    });
    return resultFiles;
  }

  static async readFile(
    filePath: string,
    encoding: BufferEncoding = 'utf8',
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      files.readFile(filePath, encoding, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  static async readFileBase64(filePath: string) {
    const image = files.readFileSync(filePath);
    return image.toString('base64');
  }
}
