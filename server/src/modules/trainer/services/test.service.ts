import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TestDto } from '../dto/test/test.dto';
import { TrainerEntity } from '../entity/trainer.entity';
import { CheckTestDto } from '../dto/test/check-test.dto';
import { SaveTestDto } from '../dto/test/save-test.dto';
import { TrainerQuestionEntity } from '../entity/trainer-question.entity';
import { QuestionAnswerEntity } from '../entity/question-answer.entity';
import { In, IsNull, Not } from 'typeorm';
import { TrainerType } from '../entity/trainer-type';
import { LessonEntity } from '@modules/topic/lesson/entity/lesson.entity';

@Injectable()
export class TestService {
  constructor(@InjectMapper() private mapper: Mapper) {}

  public async create(dto: SaveTestDto) {
    const { id: trainerId } = await TrainerEntity.create({
      topicId: dto.topicId,
      type: TrainerType.TEST,
      name: dto.name,
    }).save();

    Promise.all(
      dto.questions.map(async (q) => {
        const { id: questionId } = await TrainerQuestionEntity.create({
          question: q.question,
          trainerId,
        }).save();

        await Promise.all(
          q.answers.map(async (answer) => {
            await QuestionAnswerEntity.create({ ...answer, questionId }).save();
          }),
        );
      }),
    );
    await TrainerEntity.update(
      {
        id: Not(trainerId),
        topicId: dto.topicId,
        nextLessonId: IsNull(),
        nextTaskId: IsNull(),
      },
      { nextTaskId: trainerId },
    );
    await LessonEntity.update(
      { topicId: dto.topicId, nextLessonId: IsNull(), nextTaskId: IsNull() },
      { nextTaskId: trainerId },
    );
    return trainerId;
  }
  public async update(id: number, dto: SaveTestDto) {
    await TrainerEntity.update({ id }, { name: dto.name });
    await TrainerQuestionEntity.delete({ trainerId: id });
    await Promise.all(
      dto.questions.map(async (q, index) => {
        const { id: questionId } = await TrainerQuestionEntity.create({
          question: q.question,
          trainerId: id,
          order: index,
        }).save();

        await Promise.all(
          q.answers.map(async (answer) => {
            await QuestionAnswerEntity.create({
              ...answer,
              questionId,
              order: index,
            }).save();
          }),
        );
      }),
    );
  }
  public async check({ answerIds }: CheckTestDto) {
    const answers = await QuestionAnswerEntity.find({
      where: { id: In(answerIds) },
    });
    return answers.every((a) => a.isCorrect);
  }

  public async read(id: number, full = false) {
    const test = await TrainerEntity.findOne({
      where: { id },
      relations: { questions: { answers: true }, nextTask: true },
      order: { questions: { order: 'ASC', answers: { order: 'ASC' } } },
    });
    if (!test) {
      throw new NotFoundException('Тренажер не найден');
    }
    if (!full) {
      test.questions.forEach((q) => {
        q.answers.forEach((a) => {
          a.isCorrect = undefined;
        });
      });
    }
    return this.mapper.map(test, TrainerEntity, TestDto);
  }
}
