import { AutoMap } from '@automapper/classes';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrainerEntity } from './trainer.entity';
import { QuestionAnswerEntity } from './question-answer.entity';

@Entity('trainer_question', {
  schema: 'mod',
})
export class TrainerQuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
  })
  question: string;

  @Column({ nullable: false })
  trainerId: number;

  @Column({ nullable: false })
  order: number;

  @ManyToOne(() => TrainerEntity, (trainer) => trainer.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'trainerId' })
  @AutoMap(() => TrainerEntity)
  trainer: TrainerEntity;

  @OneToMany(() => QuestionAnswerEntity, (answer) => answer.question)
  @JoinColumn({ name: 'id' })
  @AutoMap(() => [QuestionAnswerEntity])
  answers: QuestionAnswerEntity[];
}
