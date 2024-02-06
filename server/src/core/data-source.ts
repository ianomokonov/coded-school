import { Roles1707231989655 } from 'migrations/1707231989655-roles';
import { DataSource, getMetadataArgsStorage } from 'typeorm';

let dataSource = null;

export const getDataSource = (
  host?: string,
  password?: string,
  dbName?: string,
): DataSource => {
  if (dataSource) return dataSource;
  dataSource = new DataSource({
    name: dbName,
    type: 'mysql',
    synchronize: true,
    entities: getMetadataArgsStorage()
      .tables // .filter((table) => !!table.schema)
      .map((tbl) => tbl.target),
    host: host,
    // port: 3306,
    username: dbName,
    password: password,
    database: dbName,
    charset: 'utf8mb4_unicode_ci',
    migrations: [Roles1707231989655],
    migrationsRun: true,
    // debug: true,
  });
  return dataSource;
};
