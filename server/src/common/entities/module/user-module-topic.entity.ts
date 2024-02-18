import { AutoMap } from '@automapper/classes';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModuleEntity } from './user-module.entity';
import { TopicEntity } from './topic.entity';

@Entity('user_module_topic', {
  schema: 'mod',
})
export class UserModuleTopicEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isCompleted: boolean;

  @Column()
  userModuleId: number;

  @Column()
  topicId: number;

  @ManyToOne(() => TopicEntity)
  @JoinColumn({ name: 'topicId' })
  @AutoMap(() => TopicEntity)
  topic: TopicEntity;

  @ManyToOne(() => UserModuleEntity)
  @JoinColumn({ name: 'userModuleId' })
  @AutoMap(() => UserModuleEntity)
  userModule: UserModuleEntity;
}
