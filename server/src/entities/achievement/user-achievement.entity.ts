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
  user: UserEntity;

  @ManyToOne(() => AchievementEntity)
  @JoinColumn({ name: 'achievementId' })
  achievement: AchievementEntity;
}
