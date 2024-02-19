import { AutoMap } from '@automapper/classes';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TopicEntity } from '../topic/topic.entity';
import { AchievementEntity } from '@entities/achievement/achievement.entity';
import { NoteEntity } from '@entities/note/note.entity';

@Entity('module', {
  schema: 'mod',
})
export class ModuleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
  })
  name: string;

  @OneToMany(() => TopicEntity, (topic) => topic.module)
  @JoinColumn({ name: 'id' })
  @AutoMap(() => [TopicEntity])
  topics: TopicEntity[];

  @OneToMany(() => AchievementEntity, (achievement) => achievement.module)
  @JoinColumn({ name: 'id' })
  @AutoMap(() => [AchievementEntity])
  achievements: AchievementEntity[];

  @OneToMany(() => NoteEntity, (note) => note.module)
  @JoinColumn({ name: 'id' })
  @AutoMap(() => [NoteEntity])
  notes: NoteEntity[];
}
