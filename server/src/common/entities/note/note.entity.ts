import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '@entities/user/user.entity';
import { AutoMap } from '@automapper/classes';

@Entity('note', {
  schema: 'note',
})
export class NoteEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  content: string;

  @Column({ default: false })
  isFavorite: boolean;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.notes)
  @JoinColumn({ name: 'userId' })
  @AutoMap(() => UserEntity)
  user: UserEntity;
}
