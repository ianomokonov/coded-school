import { AutoMap } from '@automapper/classes';
import { TopicEntity } from '@entities/topic/topic.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column('varchar', {
    nullable: false,
  })
  templatesDir: string;

  @Column('text', { default: '' })
  task: string;

  @Column({ nullable: true })
  nextLessonId: number;

  @Column({ nullable: true })
  nextTaskId: number;

  @Column({ nullable: false })
  topicId: number;

  @ManyToOne(() => TopicEntity)
  @JoinColumn({ name: 'topicId' })
  @AutoMap(() => TopicEntity)
  topic: TopicEntity;
}
