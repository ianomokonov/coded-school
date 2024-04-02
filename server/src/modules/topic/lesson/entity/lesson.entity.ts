import { AutoMap } from '@automapper/classes';
import { TopicEntity } from '@entities/topic/topic.entity';
import { TrainerEntity } from '@modules/trainer/entity/trainer.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('lesson', {
  schema: 'mod',
})
export class LessonEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
  })
  name: string;

  @Column('text', { default: '' })
  content: string;

  @Column({ nullable: true })
  nextLessonId: number;

  @Column({ nullable: true })
  nextTaskId: number;

  @Column({ nullable: false })
  topicId: number;

  @Column({ default: false })
  isFirst: boolean;

  @ManyToOne(() => TopicEntity)
  @JoinColumn({ name: 'topicId' })
  @AutoMap(() => TopicEntity)
  topic: TopicEntity;

  @OneToOne(() => TrainerEntity, { nullable: true })
  @JoinColumn({ name: 'nextTaskId' })
  @AutoMap(() => TrainerEntity)
  nextTask: TrainerEntity;
}
