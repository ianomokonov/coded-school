import { Injectable, NotFoundException } from '@nestjs/common';
import * as files from 'fs';
import * as process from 'process';
import * as path from 'path';
import { TrainerDto } from './dto/trainer.dto';
import { TrainerEntity } from './entity/trainer.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class TrainerService {
  constructor(@InjectMapper() private mapper: Mapper) {}

  async getTrainer(id: number): Promise<TrainerDto> {
    const trainer = await TrainerEntity.findOne({ where: { id } });
    if (!trainer) {
      throw new NotFoundException('Тренажер не найден');
    }

    const fileNames = await this.getFiles(trainer.templatesDir);

    const dto = this.mapper.map(trainer, TrainerEntity, TrainerDto);

    dto.files = await Promise.all(
      fileNames.map(async (fn) => {
        const fileContent = await this.readFile(
          path.join(
            process.cwd(),
            'dist',
            'src',
            'tasks',
            trainer.templatesDir,
            fn,
          ),
        );

        return {
          label: fn,
          content: fileContent,
        };
      }),
    );

    return dto;
  }

  async checkTrainer(id: number): Promise<boolean> {
    return !!id;
  }

  private async getFiles(dir: string): Promise<string[]> {
    const currPath = path.join(process.cwd(), 'dist', 'src', 'tasks', dir);
    const resultFiles = [];
    files.readdirSync(currPath).forEach((el) => {
      if (el[0] === '.' || el === 'node_modules') return;
      const isDir = el.split('.').length === 1;
      if (isDir) {
        return;
      }

      resultFiles.push(el);
    });
    return resultFiles;
  }

  private async readFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      files.readFile(filePath, 'utf8', (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}
