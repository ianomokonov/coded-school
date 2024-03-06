import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MarathonDifficulty } from './marathon-difficulty';

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
}
