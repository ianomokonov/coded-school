import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { UserModuleEntity } from '../module/user-module.entity';
import { UserMarathonEntity } from '../marathon/user-marathon.entity';
import { UserRoleEntity } from './user-role.entity';
import { UserAchievementEntity } from '../achievement/user-achievement.entity';

@Entity('user', {
  schema: 'sec',
})
export class UserEntity extends BaseEntity {
  @Generated('increment')
  @PrimaryColumn({
    type: 'int',
    transformer: {
      to: (entityValue: number) => entityValue,
      from: (databaseValue: string): number => parseInt(databaseValue, 10),
    },
  })
  id: number;

  @Column('varchar', {
    nullable: true,
  })
  name: string;

  @Column('varchar', {
    nullable: false,
  })
  email: string;

  @Column('varchar', {
    nullable: false,
  })
  password: string;

  @Column('varchar', {
    nullable: true,
  })
  refreshToken: string;

  @Column({ default: 0 })
  points: number;

  @OneToMany(() => UserModuleEntity, (userModule) => userModule.user)
  modules: UserModuleEntity[];

  @OneToMany(() => UserMarathonEntity, (userMarathon) => userMarathon.user)
  marathons: UserMarathonEntity[];

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.user)
  roles: UserRoleEntity[];

  @OneToMany(
    () => UserAchievementEntity,
    (userAchievement) => userAchievement.user,
  )
  achievements: UserAchievementEntity[];
}
