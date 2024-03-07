import { Injectable, NotFoundException } from '@nestjs/common';
import { SaveLessonDto } from './dto/save-lesson.dto';
import { LessonDto } from './dto/lesson.dto';
import { LessonEntity } from './entity/lesson.entity';
import { UserLessonEntity } from './entity/user-lesson.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class LessonService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  async create(dto: SaveLessonDto) {
    const { id } = await LessonEntity.create({ ...dto }).save();
    return id;
  }

  async update(id: number, dto: SaveLessonDto) {
    await LessonEntity.update({ id }, { ...dto });
  }

  async delete(id: number) {
    await LessonEntity.delete({ id });
  }

  async read(id: number, userId?: number): Promise<LessonDto> {
    const lesson = await LessonEntity.findOne({ where: { id } });
    if (!lesson) {
      throw new NotFoundException('Урок не найден');
    }

    const userLesson = userId
      ? await UserLessonEntity.findOne({ where: { lessonId: id, userId } })
      : null;

    const dto = this.mapper.map(lesson, LessonEntity, LessonDto);

    dto.isCompleted = userLesson?.isCompleted;

    return dto;
  }
}
