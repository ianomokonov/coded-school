import { AutoMap } from '@automapper/classes';
import { MarathonEntity } from '@entities/marathon/marathon.entity';
import { TrainerEntity } from '@modules/trainer/entity/trainer.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('marathon_trainer', {
  schema: 'mod',
})
export class MarathonTrainerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  order: number;

  @Column({ nullable: false })
  trainerId: number;

  @ManyToOne(() => TrainerEntity)
  @JoinColumn({ name: 'trainerId' })
  @AutoMap(() => TrainerEntity)
  trainer: TrainerEntity;

  @Column({ nullable: false })
  marathonId: number;

  @ManyToOne(() => MarathonEntity, (marathon) => marathon.trainers)
  @JoinColumn({ name: 'marathonId' })
  @AutoMap(() => MarathonEntity)
  marathon: MarathonEntity;
}
