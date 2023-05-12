import {MigrationInterface, QueryRunner, Table} from "typeorm";
import {CreateTableMigration} from "./abstracts/CreateTableMigration";

export class createMessageTable1683749388350 extends CreateTableMigration implements MigrationInterface {
  public readonly tableName: string = "Message";

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
          name: "text",
          type: "text",
          isNullable: false,
        },
      ],
    }));
  }
}
