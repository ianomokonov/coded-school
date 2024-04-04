import { AutoMap } from '@automapper/classes';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrainerEntity } from './trainer.entity';

@Entity('trainer_pattern', {
  schema: 'mod',
})
export class TrainerPatternEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
  })
  pattern: string;

  @Column('varchar', {
    nullable: false,
  })
  comment: string;

  @Column({ nullable: false })
  trainerId: number;

  @Column({ default: false })
  shouldExist: boolean;

  @ManyToOne(() => TrainerEntity, (trainer) => trainer.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'trainerId' })
  @AutoMap(() => TrainerEntity)
  trainer: TrainerEntity;
}
