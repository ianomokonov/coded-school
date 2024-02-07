import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { AchievementEntity } from './achievement.entity';
import { AutoMap } from '@automapper/classes';

@Entity('user_achievement', {
  schema: 'ach',
})
export class UserAchievementEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  achievementId: number;

  @ManyToOne(() => UserEntity, (user) => user.achievements)
  @JoinColumn({ name: 'userId' })
  @AutoMap(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => AchievementEntity)
  @JoinColumn({ name: 'achievementId' })
  @AutoMap(() => AchievementEntity)
  achievement: AchievementEntity;
}
