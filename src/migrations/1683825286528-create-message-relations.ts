import {MigrationInterface, TableForeignKey} from "typeorm";
import {CreateTableFkMigration} from "./abstracts/CreateTableFkMigration";

export class createMessageRelations1683825286528 extends CreateTableFkMigration implements MigrationInterface {
  readonly tableName: string = "Message";

  readonly migrations: TableForeignKey[] = [
    new TableForeignKey({
      columnNames: ["taskResultId"],
      referencedTableName: "TaskResult",
      referencedColumnNames: ["id"],
    }),
    new TableForeignKey({
      columnNames: ["authorId"],
      referencedTableName: "User",
      referencedColumnNames: ["id"],
    }),
  ];
}
