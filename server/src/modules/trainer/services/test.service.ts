import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TestDto } from '../dto/test/test.dto';
import { TrainerEntity } from '../entity/trainer.entity';
import { CheckTestDto } from '../dto/test/check-test.dto';
import { SaveTestDto } from '../dto/test/save-test.dto';
import { TrainerQuestionEntity } from '../entity/trainer-question.entity';
import { QuestionAnswerEntity } from '../entity/question-answer.entity';
import { In } from 'typeorm';

@Injectable()
export class TestService {
  constructor(@InjectMapper() private mapper: Mapper) {}

  public async create(dto: SaveTestDto) {
    const { id: trainerId } = await TrainerEntity.create({
      topicId: dto.topicId,
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
    return trainerId;
  }
  public async update(id: number, dto: SaveTestDto) {
    await TrainerEntity.update({ id }, { name: dto.name });
    Promise.all(
      dto.questions.map(async (q) => {
        await TrainerQuestionEntity.update(
          { id: q.id },
          {
            question: q.question,
          },
        );

        await QuestionAnswerEntity.delete({ questionId: q.id });

        await Promise.all(
          q.answers.map(async (answer) => {
            await QuestionAnswerEntity.create({
              ...answer,
              questionId: q.id,
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
