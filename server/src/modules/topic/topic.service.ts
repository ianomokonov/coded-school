import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { SaveTopicDto } from '@dtos/topic/save-topic.dto';
import { TopicDto } from '@dtos/topic/topic.dto';
import { TopicEntity } from '@entities/topic/topic.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserLessonEntity } from './lesson/entity/user-lesson.entity';

@Injectable()
export class TopicService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}
  async create(dto: SaveTopicDto) {
    const { id } = await TopicEntity.create({ ...dto }).save();
    return id;
  }

  async update(id: number, dto: SaveTopicDto) {
    await TopicEntity.update({ id }, { ...dto });
  }

  async delete(id: number) {
    await TopicEntity.delete({ id });
  }

  async read(id: number, userId?: number): Promise<TopicDto> {
    const topic = await TopicEntity.findOne({
      where: { id },
      relations: { lessons: true },
    });

    if (!topic) {
      throw new NotFoundException('Тема не найдена');
    }

    const userLessons = userId
      ? await UserLessonEntity.find({
          where: { userId, lesson: { topicId: id } },
          relations: { lesson: true },
        })
      : [];

    const dto = this.mapper.map(topic, TopicEntity, TopicDto);
    dto.isCompleted =
      topic.lessons.length === userLessons?.length &&
      userLessons.every((l) => l.isCompleted);

    dto.lessons.forEach((l) => {
      l.isCompleted = !!userLessons.find(
        (ul) => ul.lessonId === l.id && ul.isCompleted,
      );
    });

    return dto;
  }
}
