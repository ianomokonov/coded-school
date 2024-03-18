import * as path from 'path';
import { path as rootPath } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';

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
}
