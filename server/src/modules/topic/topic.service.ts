import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { SaveTopicDto } from '@dtos/topic/save-topic.dto';
import { TopicDto } from '@dtos/topic/topic.dto';
import { TopicEntity } from '@entities/topic/topic.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserLessonEntity } from './lesson/entity/user-lesson.entity';
import {
  MoveChildType,
  MoveTopicChildDto,
} from '@dtos/topic/move-topic-child.dto';
import { LessonEntity } from './lesson/entity/lesson.entity';
import { TrainerEntity } from '@modules/trainer/entity/trainer.entity';

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

  async moveChild({ child, prevChild, topicId }: MoveTopicChildDto) {
    const topicChildren = [
      ...(await LessonEntity.find({ where: { topicId } })),
      ...(await TrainerEntity.find({ where: { topicId } })),
    ];
    const childEntity = topicChildren.find(
      (c) =>
        c.id === child.id &&
        c instanceof
          (child.type === MoveChildType.Lesson ? LessonEntity : TrainerEntity),
    );

    const newPrevChildEntity = prevChild
      ? topicChildren.find(
          (c) =>
            c.id === prevChild.id &&
            c instanceof
              (prevChild.type === MoveChildType.Lesson
                ? LessonEntity
                : TrainerEntity),
        )
      : null;

    const oldPrevChildEntity = topicChildren.find((c) =>
      child.type === MoveChildType.Lesson
        ? c.nextLessonId === child.id
        : c.nextTaskId === child.id,
    );

    // убираем с предыдущего места
    if (oldPrevChildEntity) {
      oldPrevChildEntity.nextLessonId = childEntity.nextLessonId;
      oldPrevChildEntity.nextTaskId = childEntity.nextTaskId;
      await oldPrevChildEntity.save();
    }

    // ставим на новое место

    if (childEntity.isFirst) {
      const oldNextEntity = topicChildren.find((c) =>
        c instanceof LessonEntity
          ? c.id === childEntity.nextLessonId
          : c.id === childEntity.nextTaskId,
      );
      oldNextEntity.isFirst = true;
      childEntity.isFirst = false;
      await oldNextEntity.save();
    }

    if (newPrevChildEntity) {
      childEntity.nextLessonId = newPrevChildEntity.nextLessonId;
      childEntity.nextTaskId = newPrevChildEntity.nextTaskId;

      newPrevChildEntity.nextLessonId =
        childEntity instanceof LessonEntity ? childEntity.id : null;
      newPrevChildEntity.nextTaskId =
        childEntity instanceof TrainerEntity ? childEntity.id : null;

      await childEntity.save();
      await newPrevChildEntity.save();
      return;
    }

    const firstChild = topicChildren.find((c) => c.isFirst);

    childEntity.isFirst = true;
    firstChild.isFirst = false;

    childEntity.nextLessonId =
      firstChild instanceof LessonEntity ? firstChild.id : null;
    childEntity.nextTaskId =
      firstChild instanceof TrainerEntity ? firstChild.id : null;
    await childEntity.save();
    await firstChild.save();
  }
}
