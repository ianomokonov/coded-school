import { AutoMap } from '@automapper/classes';
import { ModuleEntity } from '@entities/module/module.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('achievement', {
  schema: 'ach',
})
export class AchievementEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
  })
  name: string;

  @Column({ nullable: false })
  points: number;

  @Column({ nullable: true })
  moduleId: number;

  @ManyToOne(() => ModuleEntity)
  @JoinColumn({ name: 'moduleId' })
  @AutoMap(() => ModuleEntity)
  module: ModuleEntity;
}
