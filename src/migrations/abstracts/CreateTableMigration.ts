import {QueryRunner} from "typeorm/browser";
import {ISingleTableMigration} from "../types/ISingleTableMigration";

export abstract class CreateTableMigration implements ISingleTableMigration {
  public readonly abstract tableName: string;

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
