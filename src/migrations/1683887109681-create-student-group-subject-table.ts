import { MigrationInterface } from "typeorm/browser"
import {CreateManyToManyTableMigration} from "./abstracts/CreateManyToManyTableMigration";

export class createStudentGroupSubjectTable1683887109681 extends CreateManyToManyTableMigration implements MigrationInterface {
  public readonly tableName: string = "StudentGroupSubject";

  public readonly table1RefName: string = "StudentGroup";
  public readonly column1RefName: string = "groupId";

  public readonly table2RefName: string = "Subject";
  public readonly column2RefName: string = "subjectId";
}
