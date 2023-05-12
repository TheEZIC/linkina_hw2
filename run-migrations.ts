import {database} from "./src/backend/Database";

const runMigrations = async () => {
  const qr = database.dataSource.createQueryRunner();

  for (const migration of database.dataSource.migrations) {
    await migration.up(qr);
  }
}

runMigrations();
