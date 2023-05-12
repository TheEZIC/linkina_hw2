import {MigrationInterface, QueryRunner, Table} from "typeorm"
import {CreateTableMigration} from "./abstracts/CreateTableMigration";

export class createSubjectTable1683745950053 extends CreateTableMigration implements MigrationInterface {
  public readonly tableName: string = "Subject";

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
          name: "semester",
          type: "integer",
          isNullable: false,
        },
      ],
    }));
  }
}
