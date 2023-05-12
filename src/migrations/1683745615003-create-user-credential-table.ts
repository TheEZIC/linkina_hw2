import {MigrationInterface, QueryRunner, Table} from "typeorm"
import {CreateTableMigration} from "./abstracts/CreateTableMigration";

export class createUserCredentialTable1683745615003 extends CreateTableMigration implements MigrationInterface {
  public readonly tableName: string = "UserCredential";

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
          name: "login",
          type: "text",
          isNullable: false,
          isUnique: true,
        },
        {
          name: "password",
          type: "text",
          isNullable: false,
        },
      ]
    }));
  }
}
