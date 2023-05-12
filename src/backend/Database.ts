import DataSrc from "../../TypeORM.config";

export const database = {
  dataSource: DataSrc,
  get isStarted() {
    return this.dataSource.isInitialized;
  },
  async start() {
    await database.dataSource.initialize();
    await database.dataSource.runMigrations();
  },
  async stop() {
    await this.dataSource.destroy();
  },
};
