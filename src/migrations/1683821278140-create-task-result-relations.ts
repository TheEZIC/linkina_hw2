import {MigrationInterface, TableForeignKey} from "typeorm";
import {CreateTableFkMigration} from "./abstracts/CreateTableFkMigration";

export class createTaskResultRelations1683821278140 extends CreateTableFkMigration implements MigrationInterface {
  readonly tableName: string = "TaskResult";

  readonly migrations: TableForeignKey[] = [
    new TableForeignKey({
      columnNames: ["taskId"],
      referencedTableName: "Task",
      referencedColumnNames: ["id"],
    }),
    new TableForeignKey({
      columnNames: ["studentId"],
      referencedTableName: "User",
      referencedColumnNames: ["id"],
    }),
    new TableForeignKey({
      columnNames: ["teacherId"],
      referencedTableName: "User",
      referencedColumnNames: ["id"],
    }),
  ];
}
