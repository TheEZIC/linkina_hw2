import {MigrationInterface, QueryRunner, Table} from "typeorm";
import {CreateTableMigration} from "./abstracts/CreateTableMigration";

export class createTaskResultTable1683746877875 extends CreateTableMigration implements MigrationInterface {
  public readonly tableName: string = "TaskResult";

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
          name: "status",
          type: "text",
          isNullable: false,
        },
        {
          name: "mark",
          type: "integer",
          isNullable: true,
        },
        {
          name: "teacherId",
          type: "integer",
          isNullable: true,
        },
        {
          name: "studentId",
          type: "integer",
          isNullable: true,
        },
        {
          name: "taskId",
          type: "integer",
          isNullable: true,
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
