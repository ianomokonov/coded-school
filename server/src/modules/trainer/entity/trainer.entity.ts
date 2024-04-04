import { AutoMap } from '@automapper/classes';
import { TopicEntity } from '@entities/topic/topic.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrainerType } from './trainer-type';
import { TrainerQuestionEntity } from './trainer-question.entity';
import { TrainerPatternEntity } from './trainer-pattern.entity';

@Entity('trainer', {
  schema: 'mod',
})
export class TrainerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: TrainerType,
    default: TrainerType.TRAINER,
  })
  type: TrainerType;

  @Column('varchar', {
    nullable: true,
  })
  templatesDir: string;

  @Column({ default: false })
  isFirst: boolean;

  @Column('text', { default: '' })
  task: string;

  @Column({ nullable: true })
  nextLessonId: number;

  @Column({ nullable: true })
  nextTaskId: number;

  @Column({ nullable: true })
  topicId: number;

  @ManyToOne(() => TopicEntity)
  @JoinColumn({ name: 'topicId' })
  @AutoMap(() => TopicEntity)
  topic: TopicEntity;

  @OneToMany(() => TrainerQuestionEntity, (question) => question.trainer)
  @JoinColumn({ name: 'id' })
  @AutoMap(() => [TrainerQuestionEntity])
  questions: TrainerQuestionEntity[];

  @OneToMany(() => TrainerPatternEntity, (pattern) => pattern.trainer)
  @JoinColumn({ name: 'id' })
  @AutoMap(() => [TrainerPatternEntity])
  patterns: TrainerPatternEntity[];

  @OneToOne(() => TrainerEntity, { nullable: true })
  @JoinColumn({ name: 'nextTaskId' })
  @AutoMap(() => TrainerEntity)
  nextTask: TrainerEntity;
}
