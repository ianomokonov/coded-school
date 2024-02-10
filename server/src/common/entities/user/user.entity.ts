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
import { AutoMap } from '@automapper/classes';
import { GenderEnum } from '@dtos/user/passport.user.dto';

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
  secondName: string;

  @Column('varchar', {
    nullable: false,
  })
  firstName: string;

  @Column('varchar', {
    nullable: true,
  })
  surname: string;

  @Column('varchar', {
    nullable: false,
  })
  email: string;

  @Column('varchar', {
    nullable: false,
  })
  /**
   * @autoMapIgnore
   */
  password: string;

  @Column('datetime', {
    nullable: true,
  })
  birthDate: Date;

  @Column('datetime', {
    nullable: false,
  })
  registrationDate: Date;

  @Column('varchar', {
    nullable: true,
  })
  country: string;

  @Column('varchar', {
    nullable: true,
  })
  city: string;

  @Column('enum', {
    nullable: false,
    enum: GenderEnum,
    default: GenderEnum.UNSET,
  })
  gender: GenderEnum;

  @Column('varchar', {
    nullable: true,
  })
  /**
   * @autoMapIgnore
   */
  refreshToken: string;

  @Column({ default: 0 })
  points: number;

  @OneToMany(() => UserModuleEntity, (userModule) => userModule.user)
  @AutoMap(() => [UserModuleEntity])
  modules: UserModuleEntity[];

  @OneToMany(() => UserMarathonEntity, (userMarathon) => userMarathon.user)
  @AutoMap(() => [UserMarathonEntity])
  marathons: UserMarathonEntity[];

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.user)
  @AutoMap(() => [UserRoleEntity])
  roles: UserRoleEntity[];

  @OneToMany(
    () => UserAchievementEntity,
    (userAchievement) => userAchievement.user,
  )
  @AutoMap(() => [UserAchievementEntity])
  achievements: UserAchievementEntity[];
}
