import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('note', {
  schema: 'note',
})
export class NoteEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  content: string;

  @Column({ default: false })
  isFavorite: boolean;
}
