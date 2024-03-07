import { AutoMap } from '@automapper/classes';
import { UserEntity } from '@entities/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LessonEntity } from './lesson.entity';

@Entity('user_lesson', {
  schema: 'mod',
})
export class UserLessonEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isCompleted: boolean;

  @Column()
  userId: number;

  @Column()
  lessonId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  @AutoMap(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => LessonEntity)
  @JoinColumn({ name: 'lessonId' })
  @AutoMap(() => LessonEntity)
  lesson: LessonEntity;
}
