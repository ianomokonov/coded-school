import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MarathonDifficulty } from './marathon-difficulty';
import { MarathonTrainerEntity } from '@modules/marathon/entity/marathon-trainer.entity';
import { AutoMap } from '@automapper/classes';

@Entity('marathon', {
  schema: 'mar',
})
export class MarathonEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: MarathonDifficulty,
    default: MarathonDifficulty.Junior,
  })
  difficulty: MarathonDifficulty;

  @Column({ nullable: false })
  points: number;

  /** Ограничение времени в минутах */
  @Column({ nullable: true })
  time: number;

  @OneToMany(
    () => MarathonTrainerEntity,
    (marathonTrainer) => marathonTrainer.marathon,
  )
  @JoinColumn({ name: 'id' })
  @AutoMap(() => [MarathonTrainerEntity])
  trainers: MarathonTrainerEntity[];
}
