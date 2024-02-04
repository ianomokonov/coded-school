import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ModuleEntity } from './module.entity';

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
  user: UserEntity;

  @ManyToOne(() => ModuleEntity)
  @JoinColumn({ name: 'moduleId' })
  module: ModuleEntity;
}
