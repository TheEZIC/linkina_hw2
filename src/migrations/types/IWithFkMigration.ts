import {TableForeignKey} from "typeorm/browser";

export interface IWithFkMigration {
  migrations: TableForeignKey[];
}
