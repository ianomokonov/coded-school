import { AutoMap } from '@automapper/classes';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrainerEntity } from './trainer.entity';
import { TrainerQuestionEntity } from './trainer-question.entity';

@Entity('trainer_question_answer', {
  schema: 'mod',
})
export class QuestionAnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
  })
  label: string;

  @Column({
    default: false,
  })
  isCorrect: boolean;

  @Column({ nullable: false })
  questionId: number;

  @ManyToOne(() => TrainerQuestionEntity, (question) => question.answers)
  @JoinColumn({ name: 'questionId' })
  @AutoMap(() => TrainerEntity)
  question: TrainerQuestionEntity;
}
