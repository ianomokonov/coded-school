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

  @Column({ nullable: false })
  topicId: number;

  @ManyToOne(() => TopicEntity)
  @JoinColumn({ name: 'topicId' })
  @AutoMap(() => TopicEntity)
  topic: TopicEntity;
}
