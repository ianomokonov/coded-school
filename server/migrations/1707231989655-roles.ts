import { MigrationInterface, QueryRunner } from 'typeorm';

export class Roles1707231989655 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`INSERT INTO role (name) VALUES ('user'), ('admin')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
