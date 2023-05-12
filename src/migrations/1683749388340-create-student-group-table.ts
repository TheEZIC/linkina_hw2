import {MigrationInterface, QueryRunner, Table} from "typeorm/browser"
import {CreateTableMigration} from "./abstracts/CreateTableMigration";

export class createStudentGroupTable1683749388340 extends CreateTableMigration implements MigrationInterface {
  public readonly tableName: string = "StudentGroup";

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
          name: "semester",
          type: "integer",
          isNullable: false,
        },
      ],
    }));
  }
}
