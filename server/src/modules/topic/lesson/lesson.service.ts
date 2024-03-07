import { Injectable } from '@nestjs/common';
import { SaveLessonDto } from './dto/save-lesson.dto';
import { LessonDto } from './dto/lesson.dto';
import { LessonEntity } from './entity/lesson.entity';

@Injectable()
export class LessonService {
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

  async read(id: number): Promise<LessonDto> {
    return await LessonEntity.findOne({ where: { id } });
  }
}
