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
import { GenderEnum } from '../../modules/user/dto/passport.user.dto';

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
  password: string;

  @Column('date', {
    nullable: true,
  })
  birtDate: Date;

  @Column('varchar', {
    nullable: true,
  })
  address: string;

  @Column('enum', {
    nullable: true,
    enum: GenderEnum,
  })
  gender: GenderEnum;

  @Column('varchar', {
    nullable: true,
  })
  refreshToken: string;

  @OneToMany(() => UserModuleEntity, (userModule) => userModule.user)
  modules: UserModuleEntity[];

  @OneToMany(() => UserMarathonEntity, (userMarathon) => userMarathon.user)
  marathons: UserMarathonEntity[];
}
