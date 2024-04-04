import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import { TrainerEntity } from '../entity/trainer.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CreateTaskDto } from '../dto/task/create-task.dto';
import { ensureDir, writeFile, remove } from 'fs-extra';
import { path as rootPath } from 'app-root-path';
import { UpdateTaskDto } from '../dto/task/update-task.dto';
import { IsNull, Not } from 'typeorm';
import { LessonEntity } from '@modules/topic/lesson/entity/lesson.entity';
import { v4 as uuidv4 } from 'uuid';
import { FilesHelper } from 'src/utils/files-helper';
import nodeHtmlToImage from 'node-html-to-image';
import * as looksSame from 'looks-same';
import { TaskDto } from '../dto/task/task.dto';
import { TrainerType } from '../entity/trainer-type';
import { TrainerPatternEntity } from '../entity/trainer-pattern.entity';
import { TaskCheckResultDto } from '../dto/task/task-check-result.dto';

@Injectable()
export class TaskService {
  constructor(@InjectMapper() private mapper: Mapper) {}

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

  async create(
    dto: CreateTaskDto,
    files: Express.Multer.File[],
    resultFiles: Express.Multer.File[],
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
    const { id } = await TrainerEntity.create({
      name: dto.name,
      type: TrainerType.TRAINER,
      templatesDir: dto.templatesDir,
      task: dto.task,
      topicId: dto.topicId,
    }).save();

    await Promise.all(
      dto.patterns.map(async (p) => {
        await TrainerPatternEntity.create({
          ...p,
          trainerId: id,
        }).save();
      }),
    );

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

    await Promise.all(
      dto.patterns.map(async (p) => {
        await TrainerPatternEntity.create({
          ...p,
          trainerId,
        }).save();
      }),
    );

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

      const resultFileNames = await FilesHelper.getFiles(
        trainer.templatesDir,
        'tasks-results',
      );

      const resultFilesContent = await Promise.all(
        resultFileNames.map(async (fn) => {
          const fileContent = await FilesHelper.readFile(
            path.join(
              rootPath,
              'src',
              'tasks-results',
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
      let html = resultFilesContent.find((f) =>
        f.label.includes('html'),
      )?.content;
      const css = resultFilesContent.find((f) =>
        f.label.includes('css'),
      )?.content;

      if (!html) {
        return;
      }
      if (css) {
        html = html.replace('<head>', `<head><style>${css}</style>`);
      }
      await nodeHtmlToImage({
        output: path.join(
          rootPath,
          'src',
          'tasks-results',
          trainer.templatesDir,
          'image.png',
        ),
        html,
        puppeteerArgs: {
          args: ['--no-sandbox'], //TODO небезопасно, в проде нужно настраивать без этого флага
        },
      });
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

    // Сравнение картинок
    const imgPath = path.join(rootPath, 'src', 'generated');
    const imgName = `${uuidv4()}.png`;
    await ensureDir(imgPath);
    await nodeHtmlToImage({
      output: path.join(imgPath, imgName),
      html,
      puppeteerArgs: {
        args: ['--no-sandbox'],
      },
    });
    const { equal } = await looksSame(
      path.join(imgPath, imgName),
      path.join(
        rootPath,
        'src',
        'tasks-results',
        trainer.templatesDir,
        'image.png',
      ),
    );
    remove(path.join(imgPath, imgName));
    return { isCorrect: equal };
  }
}
