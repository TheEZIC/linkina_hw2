import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";
import {ISingleTableMigration} from "../types/ISingleTableMigration";
import {IWithFkMigration} from "../types/IWithFkMigration";

export abstract class CreateTableFkMigration implements MigrationInterface, ISingleTableMigration, IWithFkMigration {
  public abstract readonly tableName: string;
  public abstract readonly migrations: TableForeignKey[];

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys(this.tableName, this.migrations);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(this.tableName, this.migrations);
  }
}
