import { AutoMap } from '@automapper/classes';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TopicEntity } from './topic.entity';
import { AchievementEntity } from '@entities/achievement/achievement.entity';

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
}
