import {DataSource} from "typeorm/browser";
import DataSrc from "../../TypeORM.config";

export class Database {
  private readonly _dataSource: DataSource;
  private static _instance: Database;

  private constructor() {
    this._dataSource = DataSrc;
  }

  public get dataSource(): DataSource {
    return this._dataSource;
  }

  public get isStarted(): boolean {
    return this._dataSource.isInitialized;
  }

  public async start(): Promise<void> {
    await this._dataSource.runMigrations();
    await this._dataSource.initialize();
  }

  public stop(): Promise<void> {
    return this._dataSource.destroy();
  }

  public static get instance(): Database {
    if (!this._instance) {
      this._instance = new Database();
    }

    return this._instance;
  }
}
