import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/save-lesson.dto';
import { LessonDto } from './dto/lesson.dto';
import { LessonEntity } from './entity/lesson.entity';
import { UserLessonEntity } from './entity/user-lesson.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { IsNull, Not } from 'typeorm';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { TrainerEntity } from '@modules/trainer/entity/trainer.entity';
import * as path from 'path';
import { path as rootPath } from 'app-root-path';
import { remove } from 'fs-extra';
import { FilesHelper } from 'src/utils/files-helper';

@Injectable()
export class LessonService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  async create(dto: CreateLessonDto, files: Express.Multer.File[]) {
    if (files?.length) {
      dto.content = await FilesHelper.uploadFilesWithReplace(
        files,
        dto.content,
      );
    }
    const lessons = await LessonEntity.find({
      where: { topicId: dto.topicId },
    });
    const { id } = await LessonEntity.create({
      ...dto,
      isFirst: !lessons.length,
    }).save();
    await TrainerEntity.update(
      {
        topicId: dto.topicId,
        nextLessonId: IsNull(),
        nextTaskId: IsNull(),
      },
      { nextLessonId: id },
    );
    await LessonEntity.update(
      {
        id: Not(id),
        topicId: dto.topicId,
        nextLessonId: IsNull(),
        nextTaskId: IsNull(),
      },
      { nextLessonId: id },
    );

    return id;
  }

  async update(id: number, dto: UpdateLessonDto, files: Express.Multer.File[]) {
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
    if (files?.length) {
      dto.content = await FilesHelper.uploadFilesWithReplace(
        files,
        dto.content,
      );
    }
    await LessonEntity.update({ id }, { name: dto.name, content: dto.content });
  }

  async completeLesson(id: number, userId: number) {
    await UserLessonEntity.create({
      lessonId: id,
      userId,
      isCompleted: true,
    }).save();
  }

  async delete(id: number) {
    const lesson = await LessonEntity.findOne({
      where: { id },
    });
    if (!lesson) {
      throw new NotFoundException('Урок не найден');
    }
    await LessonEntity.update(
      { nextLessonId: id },
      { nextLessonId: lesson.nextLessonId, nextTaskId: lesson.nextTaskId },
    );
    await TrainerEntity.update(
      { nextLessonId: id },
      { nextLessonId: lesson.nextLessonId, nextTaskId: lesson.nextTaskId },
    );
    await LessonEntity.delete({ id });

    await FilesHelper.removeFilesFromContent(lesson.content);
  }

  async read(id: number, userId?: number): Promise<LessonDto> {
    const lesson = await LessonEntity.findOne({
      where: { id },
      relations: { topic: true },
    });
    if (!lesson) {
      throw new NotFoundException('Урок не найден');
    }

    const userLesson = userId
      ? await UserLessonEntity.findOne({ where: { lessonId: id, userId } })
      : null;

    const dto = this.mapper.map(lesson, LessonEntity, LessonDto);

    dto.isCompleted = userLesson?.isCompleted;
    dto.moduleId = lesson.topic.moduleId;
    dto.topicId = lesson.topicId;

    return dto;
  }
}
