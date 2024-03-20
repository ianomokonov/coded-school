import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModuleEntity } from '../module/module.entity';
import { AutoMap } from '@automapper/classes';
import { LessonEntity } from '@modules/topic/lesson/entity/lesson.entity';
import { TrainerEntity } from '@modules/trainer/entity/trainer.entity';

@Entity('topic', {
  schema: 'mod',
})
export class TopicEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
  })
  name: string;

  @Column()
  moduleId: number;

  @ManyToOne(() => ModuleEntity)
  @JoinColumn({ name: 'moduleId' })
  @AutoMap(() => ModuleEntity)
  module: ModuleEntity;

  @OneToMany(() => LessonEntity, (lesson) => lesson.topic)
  @JoinColumn({ name: 'id' })
  @AutoMap(() => [LessonEntity])
  lessons: LessonEntity[];

  @OneToMany(() => TrainerEntity, (trainer) => trainer.topic)
  @JoinColumn({ name: 'id' })
  @AutoMap(() => [TrainerEntity])
  trainers: TrainerEntity[];
}
