import { Injectable, NotFoundException } from '@nestjs/common';
import * as files from 'fs';
import * as path from 'path';
import { TrainerDto } from './dto/trainer.dto';
import { TrainerEntity } from './entity/trainer.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { ensureDir, writeFile, remove } from 'fs-extra';
import { path as rootPath } from 'app-root-path';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { IsNull, Not } from 'typeorm';
import { LessonEntity } from '@modules/topic/lesson/entity/lesson.entity';
import { LessonService } from '@modules/topic/lesson/lesson.service';
import { v4 as uuidv4 } from 'uuid';
import { FilesHelper } from 'src/utils/files-helper';

@Injectable()
export class TrainerService {
  constructor(
    @InjectMapper() private mapper: Mapper,
    private lessonService: LessonService,
  ) {}

  async read(id: number): Promise<TrainerDto> {
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

  async create(
    dto: CreateTrainerDto,
    contentFiles?: Express.Multer.File[],
  ): Promise<number> {
    if (contentFiles?.length) {
      const uploadFolder = path.join(rootPath, 'src', 'static');
      await ensureDir(uploadFolder);
      await Promise.all(
        contentFiles.map(async (f, index) => {
          const [, ext] = f.originalname.split('.');
          const fileName = `${uuidv4()}.${ext}`;
          await writeFile(path.join(uploadFolder, fileName), f.buffer);
          dto.task = dto.task.replace(
            new RegExp(`src="${index}"`),
            `src="/static/${fileName}"`,
          );
        }),
      );
    }
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
      topicId: dto.topicId,
    }).save();

    await TrainerEntity.update(
      {
        id: Not(id),
        topicId: dto.topicId,
        nextLessonId: IsNull(),
        nextTaskId: IsNull(),
      },
      { nextTaskId: id },
    );
    await LessonEntity.update(
      { topicId: dto.topicId, nextLessonId: IsNull(), nextTaskId: IsNull() },
      { nextTaskId: id },
    );

    return id;
  }

  async update(
    trainerId: number,
    dto: UpdateTrainerDto,
    files?: Express.Multer.File[],
    contentFiles?: Express.Multer.File[],
  ): Promise<void> {
    if (dto.filesToDelete?.length) {
      await Promise.all(
        dto.filesToDelete.map(async (f) => {
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

    if (contentFiles?.length) {
      dto.task = await FilesHelper.uploadFilesWithReplace(
        contentFiles,
        dto.task,
      );
    }
    await TrainerEntity.update(
      { id: trainerId },
      { name: dto.name, task: dto.task, templatesDir: dto.templatesDir },
    );

    if (!files?.length) {
      return;
    }
    const trainer = await TrainerEntity.findOne({ where: { id: trainerId } });
    if (!trainer) {
      throw new NotFoundException('Тренажер не найден');
    }
    await remove(path.join(rootPath, 'src', 'tasks', trainer.templatesDir));
    await ensureDir(path.join(rootPath, 'src', 'tasks', dto.templatesDir));
    await Promise.all(
      files.map(async (f) => {
        await writeFile(
          path.join(rootPath, 'src', 'tasks', dto.templatesDir, f.originalname),
          f.buffer,
        );
      }),
    );
  }

  async delete(id: number) {
    const trainer = await TrainerEntity.findOne({ where: { id } });
    if (!trainer) {
      throw new NotFoundException('Тренажер не найден');
    }
    await remove(path.join(rootPath, 'src', 'tasks', trainer.templatesDir));
    await LessonEntity.update(
      { nextTaskId: id },
      { nextLessonId: trainer.nextLessonId, nextTaskId: trainer.nextTaskId },
    );
    await TrainerEntity.update(
      { nextTaskId: id },
      { nextLessonId: trainer.nextLessonId, nextTaskId: trainer.nextTaskId },
    );
    await TrainerEntity.delete({ id });
    await FilesHelper.removeFilesFromContent(trainer.task);
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
