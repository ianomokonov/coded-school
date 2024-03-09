import { AutoMap } from '@automapper/classes';
import { UserEntity } from '@entities/user/user.entity';
import { LessonEntity } from '@modules/topic/lesson/entity/lesson.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comment', {
  schema: 'mod',
})
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    nullable: false,
  })
  text: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  lessonId: number;

  @Column({ nullable: true })
  relativeCommentId: number;

  @ManyToOne(() => LessonEntity)
  @JoinColumn({ name: 'lessonId' })
  @AutoMap(() => LessonEntity)
  lesson: LessonEntity;

  @OneToOne(() => CommentEntity)
  @JoinColumn({ name: 'relativeCommentId' })
  @AutoMap(() => CommentEntity)
  relativeComment: CommentEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  @AutoMap(() => UserEntity)
  user: UserEntity;
}
