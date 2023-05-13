import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm"
import {CreateTableMigration} from "./abstracts/CreateTableMigration";

export class createUserTable1683744711160 extends CreateTableMigration implements MigrationInterface {
  public readonly tableName: string = "User";

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
          name: "firstName",
          type: "text",
          isNullable: false,
        },
        {
          name: "lastName",
          type: "text",
          isNullable: false,
        },
        {
          name: "role",
          type: "text",
          isNullable: false,
        },
        {
          name: "credentialId",
          type: "integer",
          isNullable: true,
        },
        {
          name: "socialId",
          type: "integer",
          isNullable: true,
        },
        {
          name: "groupId",
          type: "integer",
          isNullable: true,
        },
      ]
    }));
  }
}
