import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import { TrainerEntity } from '../entity/trainer.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { remove } from 'fs-extra';
import { path as rootPath } from 'app-root-path';
import { LessonEntity } from '@modules/topic/lesson/entity/lesson.entity';
import { FilesHelper } from 'src/utils/files-helper';
import { TrainerShortDto } from '../dto/trainer-short.dto';
import { TrainerType } from '../entity/trainer-type';

@Injectable()
export class TrainerService {
  constructor(@InjectMapper() private mapper: Mapper) {}

  async readAllTrainers(): Promise<TrainerShortDto[]> {
    const trainers = await TrainerEntity.find();

    return this.mapper.mapArray(trainers, TrainerEntity, TrainerShortDto);
  }

  async getTrainerFilePath(id: number): Promise<string> {
    const trainer = await TrainerEntity.findOne({ where: { id } });
    if (!trainer) {
      return null;
    }

    return path.join(rootPath, 'src', 'tasks', trainer.templatesDir);
  }

  async delete(id: number) {
    const trainer = await TrainerEntity.findOne({ where: { id } });
    if (!trainer) {
      throw new NotFoundException('Тренажер не найден');
    }
    if (trainer.type === TrainerType.TRAINER) {
      await remove(path.join(rootPath, 'src', 'tasks', trainer.templatesDir));
      await FilesHelper.removeFilesFromContent(trainer.task);
    }

    await LessonEntity.update(
      { nextTaskId: id },
      { nextLessonId: trainer.nextLessonId, nextTaskId: trainer.nextTaskId },
    );
    await TrainerEntity.update(
      { nextTaskId: id },
      { nextLessonId: trainer.nextLessonId, nextTaskId: trainer.nextTaskId },
    );
    await TrainerEntity.delete({ id });
  }
}
