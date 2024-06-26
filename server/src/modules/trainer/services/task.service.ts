import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import { path as rootPath } from 'app-root-path';
import { TrainerEntity } from '../entity/trainer.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CreateTaskDto } from '../dto/task/create-task.dto';
import { ensureDir, writeFile, remove, existsSync } from 'fs-extra';
import { UpdateTaskDto } from '../dto/task/update-task.dto';
import { IsNull, Not } from 'typeorm';
import { LessonEntity } from '@modules/topic/lesson/entity/lesson.entity';
import { v4 as uuidv4 } from 'uuid';
import { FilesHelper } from 'src/utils/files-helper';
import { TaskDto } from '../dto/task/task.dto';
import { TrainerType } from '../entity/trainer-type';
import { TrainerPatternEntity } from '../entity/trainer-pattern.entity';
import { TaskCheckResultDto } from '../dto/task/task-check-result.dto';
import { ImageService } from './image.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectMapper() private mapper: Mapper,
    private imageService: ImageService,
  ) {}

  async read(id: number, withResults = false): Promise<TaskDto> {
    const trainer = await TrainerEntity.findOne({
      where: { id },
      relations: { nextTask: true, topic: true, patterns: true },
    });
    if (!trainer) {
      throw new NotFoundException('Тренажер не найден');
    }

    const fileNames = await FilesHelper.getFiles(trainer.templatesDir);

    if (!withResults) {
      trainer.patterns = [];
    }

    const dto = this.mapper.map(trainer, TrainerEntity, TaskDto);

    dto.files = await Promise.all(
      fileNames.map(async (fn) => {
        const fileContent = await FilesHelper.readFile(
          path.join(rootPath, 'src', 'tasks', trainer.templatesDir, fn),
        );

        return {
          label: fn,
          content: fileContent,
        };
      }),
    );

    if (!withResults) {
      return dto;
    }

    let resultFileNames = await FilesHelper.getFiles(
      trainer.templatesDir,
      'tasks-results',
    );

    resultFileNames = resultFileNames.filter((fn) => fn !== 'image.png');

    dto.resultFiles = await Promise.all(
      resultFileNames.map(async (fn) => {
        const fileContent = await FilesHelper.readFile(
          path.join(rootPath, 'src', 'tasks-results', trainer.templatesDir, fn),
        );

        return {
          label: fn,
          content: fileContent,
        };
      }),
    );

    return dto;
  }

  async getFiles(trainerId: number, resultFiles: boolean) {
    const trainer = await TrainerEntity.findOne({
      where: { id: trainerId },
      relations: { nextTask: true, topic: true, patterns: true },
    });
    if (!trainer) {
      throw new NotFoundException('Тренажер не найден');
    }
    let fileNames = await FilesHelper.getFiles(
      trainer.templatesDir,
      resultFiles ? 'tasks-results' : 'tasks',
    );

    fileNames = fileNames.filter((fn) => fn !== 'image.png');

    return await Promise.all(
      fileNames.map(async (fn) => {
        const fileContent = await FilesHelper.readFile(
          path.join(
            rootPath,
            'src',
            resultFiles ? 'tasks-results' : 'tasks',
            trainer.templatesDir,
            fn,
          ),
          'base64',
        );

        return {
          label: fn,
          content: fileContent,
        };
      }),
    );
  }

  async create(
    dto: CreateTaskDto,
    files: Express.Multer.File[],
    resultFiles?: Express.Multer.File[],
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
    let uploadFolder = path.join(rootPath, 'src', 'tasks', dto.templatesDir);
    await ensureDir(uploadFolder);
    await Promise.all(
      files.map(async (f) => {
        await writeFile(path.join(uploadFolder, f.originalname), f.buffer);
      }),
    );
    if (resultFiles?.length) {
      uploadFolder = path.join(
        rootPath,
        'src',
        'tasks-results',
        dto.templatesDir,
      );
      await ensureDir(uploadFolder);
      await Promise.all(
        resultFiles.map(async (f) => {
          await writeFile(path.join(uploadFolder, f.originalname), f.buffer);
        }),
      );

      const resultFileNames = await FilesHelper.getFiles(
        dto.templatesDir,
        'tasks-results',
      );

      const resultFilesContent = await Promise.all(
        resultFileNames.map(async (fn) => {
          const fileContent = await FilesHelper.readFile(
            path.join(rootPath, 'src', 'tasks-results', dto.templatesDir, fn),
          );

          return {
            label: fn,
            content: fileContent,
          };
        }),
      );

      await this.imageService.generateFromFiles(
        resultFilesContent,
        path.join(rootPath, 'src', 'tasks-results', dto.templatesDir),
      );
    }

    const { id } = await TrainerEntity.create({
      name: dto.name,
      type: TrainerType.TRAINER,
      templatesDir: dto.templatesDir,
      task: dto.task,
      topicId: dto.topicId,
    }).save();

    if (dto.patterns?.length) {
      await Promise.all(
        dto.patterns.map(async (p) => {
          await TrainerPatternEntity.create({
            ...p,
            trainerId: id,
          }).save();
        }),
      );
    }

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
    dto: UpdateTaskDto,
    files?: Express.Multer.File[],
    resultFiles?: Express.Multer.File[],
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

    await TrainerPatternEntity.delete({ trainerId });

    if (dto.patterns?.length) {
      await Promise.all(
        dto.patterns.map(async (p) => {
          await TrainerPatternEntity.create({
            ...p,
            trainerId,
          }).save();
        }),
      );
    }

    if (!files?.length && !resultFiles?.length) {
      return;
    }
    const trainer = await TrainerEntity.findOne({ where: { id: trainerId } });
    if (!trainer) {
      throw new NotFoundException('Тренажер не найден');
    }

    if (files?.length) {
      await remove(path.join(rootPath, 'src', 'tasks', trainer.templatesDir));
      await ensureDir(path.join(rootPath, 'src', 'tasks', dto.templatesDir));
      await Promise.all(
        files.map(async (f) => {
          await writeFile(
            path.join(
              rootPath,
              'src',
              'tasks',
              dto.templatesDir,
              f.originalname,
            ),
            f.buffer,
          );
        }),
      );
    }

    if (resultFiles?.length) {
      await remove(
        path.join(rootPath, 'src', 'tasks-results', trainer.templatesDir),
      );
      await ensureDir(
        path.join(rootPath, 'src', 'tasks-results', dto.templatesDir),
      );
      await Promise.all(
        resultFiles.map(async (f) => {
          await writeFile(
            path.join(
              rootPath,
              'src',
              'tasks-results',
              dto.templatesDir,
              f.originalname,
            ),
            f.buffer,
          );
        }),
      );

      const resultFilesContent = await Promise.all(
        resultFiles.map(async (f) => {
          const fileContent = await FilesHelper.readFile(
            path.join(
              rootPath,
              'src',
              'tasks-results',
              dto.templatesDir,
              f.originalname,
            ),
          );

          return {
            label: f.originalname,
            content: fileContent,
          };
        }),
      );

      await this.imageService.generateFromFiles(
        resultFilesContent,
        path.join(rootPath, 'src', 'tasks-results', dto.templatesDir),
      );
    }
  }

  async check(id: number, html: string): Promise<TaskCheckResultDto> {
    const trainer = await TrainerEntity.findOne({
      where: { id },
      relations: { patterns: true },
    });
    if (!trainer) {
      throw new NotFoundException('Тренажер не найден');
    }

    // Проверка регулярок
    if (trainer.patterns?.length) {
      const messages = [];

      trainer.patterns.forEach((p) => {
        const exist = new RegExp(p.pattern).test(html);

        if (exist === p.shouldExist) {
          return;
        }

        messages.push(p.comment);
      });

      if (messages.length) {
        return { isCorrect: false, messages };
      }
    }

    const imagePath = path.join(
      rootPath,
      'src',
      'tasks-results',
      trainer.templatesDir,
    );

    if (!existsSync(path.join(imagePath, 'image.png'))) {
      return { isCorrect: true };
    }

    // Сравнение картинок
    const isCorrect = await this.imageService.compareWithHtml(html, imagePath);
    return { isCorrect };
  }
}
