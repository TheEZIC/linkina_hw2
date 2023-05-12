import {MigrationInterface, QueryRunner, Table} from "typeorm"
import {CreateTableMigration} from "./abstracts/CreateTableMigration";

export class createUserSocialTable1683745811039 extends CreateTableMigration implements MigrationInterface {
  public readonly tableName: string = "UserSocial";

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
          name: "email",
          type: "text",
          isNullable: true,
        },
      ]
    }));
  }
}
