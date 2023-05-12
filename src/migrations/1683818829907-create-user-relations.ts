import {MigrationInterface, TableForeignKey} from "typeorm";
import {CreateTableFkMigration} from "./abstracts/CreateTableFkMigration";

export class createUserRelations1683818829907 extends CreateTableFkMigration implements MigrationInterface {
  public readonly tableName: string = "User";

  public readonly migrations: TableForeignKey[] = [
    new TableForeignKey({
      columnNames: ["socialId"],
      referencedTableName: "UserSocial",
      referencedColumnNames: ["id"],
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    }),
    new TableForeignKey({
      columnNames: ["credentialId"],
      referencedTableName: "UserCredential",
      referencedColumnNames: ["id"],
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    }),
    new TableForeignKey({
      columnNames: ["groupId"],
      referencedTableName: "StudentGroup",
      referencedColumnNames: ["id"],
    }),
  ];
}
