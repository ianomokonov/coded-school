import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { UserEntity } from '../user/user.entity';
import { AutoMap } from '@automapper/classes';

@Entity('user_role', {
  schema: 'sec',
})
export class UserRoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  roleId: number;

  @ManyToOne(() => UserEntity, (user) => user.roles)
  @JoinColumn({ name: 'userId' })
  @AutoMap(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'roleId' })
  @AutoMap(() => RoleEntity)
  role: RoleEntity;
}
