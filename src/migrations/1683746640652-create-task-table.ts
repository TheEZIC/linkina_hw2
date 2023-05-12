import {MigrationInterface, QueryRunner, Table} from "typeorm"
import {CreateTableMigration} from "./abstracts/CreateTableMigration";

export class createTaskTable1683746640652 extends CreateTableMigration implements MigrationInterface {
  public readonly tableName: string = "Task";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: "id",
          type: "integer",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "increment",
        },
        {
          name: "title",
          type: "text",
          isNullable: false,
        },
        {
          name: "description",
          type: "text",
          isNullable: true,
        },
        {
          name: "subjectId",
          type: "integer",
          isNullable: true,
        },
      ],
    }));
  }
}
