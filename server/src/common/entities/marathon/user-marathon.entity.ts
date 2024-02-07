import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { MarathonEntity } from './marathon.entity';
import { AutoMap } from '@automapper/classes';

@Entity('user_marathon', {
  schema: 'mar',
})
export class UserMarathonEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;

  @Column()
  userId: number;

  @Column()
  marathonId: number;

  @ManyToOne(() => UserEntity, (user) => user.marathons)
  @JoinColumn({ name: 'userId' })
  @AutoMap(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => MarathonEntity)
  @JoinColumn({ name: 'marathonId' })
  @AutoMap(() => MarathonEntity)
  marathon: MarathonEntity;
}
