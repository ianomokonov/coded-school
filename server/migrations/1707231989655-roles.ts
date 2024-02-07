import { MigrationInterface, QueryRunner } from 'typeorm';

export class Roles1707231989655 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS role (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255)
    )`);
    queryRunner.query(`INSERT INTO role (name) VALUES ('user'), ('admin')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DELETE FROM role WHERE name in ('user', 'admin')`);
  }
}
