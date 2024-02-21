import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModuleEntity } from '../module/module.entity';
import { AutoMap } from '@automapper/classes';

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
}
