import DataSrc from "../../TypeORM.config";

export const database = {
  getDataSource() {
    return DataSrc;
  },
  isStarted() {
    return database.getDataSource().isInitialized;
  },
  async start() {
    if (database.isStarted()) {
      return;
    }

    await database.getDataSource().initialize();
    await database.getDataSource().runMigrations();
  },
  async stop() {
    if (!database.isStarted()) {
      return;
    }

    await database.getDataSource().destroy();
  },
};
