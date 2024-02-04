import { BaseEntity, Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity('user', {
  schema: 'sec',
})
export class UserEntity extends BaseEntity {
  @Generated('increment')
  @PrimaryColumn({
    type: 'int',
    transformer: {
      to: (entityValue: number) => entityValue,
      from: (databaseValue: string): number => parseInt(databaseValue, 10),
    },
  })
  id: number;

  @Column('varchar', {
    nullable: true,
  })
  name: string;

  @Column('varchar', {
    nullable: false,
  })
  email: string;

  @Column('varchar', {
    nullable: false,
  })
  password: string;

  @Column('varchar', {
    nullable: true,
  })
  refreshToken: string;
}
