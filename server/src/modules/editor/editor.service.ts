import { Injectable, StreamableFile } from '@nestjs/common';
import { spawn } from 'child_process';
import * as files from 'fs';
import * as process from 'process';
import * as path from 'path';
import { FilesTreeDto } from '@dtos/editor/files-tree.dto';

@Injectable()
export class EditorService {
  currPath: string = process.env.BASE_TASKS_URL;
  async runEditor(): Promise<void> {
    const ng = spawn('npm', ['start'], { cwd: './front/app', shell: true });
    ng.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    ng.stderr.on('data', (data) => {
      console.error(data);
    });

    ng.stdout.on('end', () => {
      console.log('end');
    });

    ng.on('close', (code) => {
      console.log('code ' + code);
    });
  }

  async getPackageData(fileName: string): Promise<StreamableFile> {
    const file = files.createReadStream(path.join(this.currPath, fileName));
    return new StreamableFile(file);
  }

  async getFiles(dir: string): Promise<FilesTreeDto[]> {
    if (dir === '') {
      this.currPath = process.env.BASE_TASKS_URL;
    }
    this.currPath = path.join(this.currPath, dir);
    const dirFiles = [];
    files.readdirSync(this.currPath).forEach((el) => {
      if (el[0] === '.' || el === 'node_modules') return;
      const isDir = el.split('.').length === 1;
      dirFiles.push({
        label: el,
        leaf: !isDir,
      });
    });
    return dirFiles;
  }
}
