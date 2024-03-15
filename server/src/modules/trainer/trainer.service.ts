import { Injectable, NotFoundException } from '@nestjs/common';
import * as files from 'fs';
import * as path from 'path';
import { TrainerDto } from './dto/trainer.dto';
import { TrainerEntity } from './entity/trainer.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { ensureDir, writeFile } from 'fs-extra';
import { path as rootPath } from 'app-root-path';

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
          path.join(rootPath, 'src', 'tasks', trainer.templatesDir, fn),
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

  async createTrainer(dto: CreateTrainerDto): Promise<number> {
    const uploadFolder = path.join(rootPath, 'src', 'tasks', dto.templatesDir);
    await ensureDir(uploadFolder);
    await Promise.all(
      dto.files.map(async (f) => {
        await writeFile(path.join(uploadFolder, f.originalname), f.buffer);
      }),
    );
    const { id } = await TrainerEntity.create({
      name: dto.name,
      templatesDir: dto.templatesDir,
      task: dto.task,
    }).save();
    return id;
  }

  private async getFiles(dir: string): Promise<string[]> {
    const currPath = path.join(rootPath, 'src', 'tasks', dir);
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
