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
import { NoteEntity } from '@entities/note/note.entity';

@Entity('user_note', {
  schema: 'note',
})
export class UserNoteEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column()
  userId: number;

  @Column()
  noteId: number;

  @ManyToOne(() => UserEntity, (user) => user.notes)
  @JoinColumn({ name: 'userId' })
  @AutoMap(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => NoteEntity)
  @JoinColumn({ name: 'noteId' })
  @AutoMap(() => NoteEntity)
  note: NoteEntity;
}
