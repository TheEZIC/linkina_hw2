import {MigrationInterface, TableForeignKey} from "typeorm";
import {CreateTableFkMigration} from "./abstracts/CreateTableFkMigration";

export class createTaskRelations1683819882678 extends CreateTableFkMigration implements MigrationInterface {
  public readonly tableName: string = "Task";
  public readonly migrations: TableForeignKey[] = [
    new TableForeignKey({
      columnNames: ["subjectId"],
      referencedTableName: "Subject",
      referencedColumnNames: ["id"],
    }),
  ];
}
