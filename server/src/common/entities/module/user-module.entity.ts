import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ModuleEntity } from './module.entity';
import { AutoMap } from '@automapper/classes';
import { UserModuleTopicEntity } from './user-module-topic.entity';

@Entity('user_module', {
  schema: 'mod',
})
export class UserModuleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;

  @Column()
  userId: number;

  @Column()
  moduleId: number;

  @ManyToOne(() => UserEntity, (user) => user.modules)
  @JoinColumn({ name: 'userId' })
  @AutoMap(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => ModuleEntity)
  @JoinColumn({ name: 'moduleId' })
  @AutoMap(() => ModuleEntity)
  module: ModuleEntity;

  @OneToMany(() => UserModuleTopicEntity, (topic) => topic.userModule)
  @JoinColumn({ name: 'id' })
  @AutoMap(() => [UserModuleTopicEntity])
  topics: UserModuleTopicEntity[];
}
