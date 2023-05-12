import {MigrationInterface} from "typeorm/browser"
import {CreateManyToManyTableMigration} from "./abstracts/CreateManyToManyTableMigration";

export class createTeacherSubjectTable1683885593710 extends CreateManyToManyTableMigration implements MigrationInterface {
  public readonly tableName: string = "TeacherSubject";

  readonly table1RefName: string = "User";
  readonly column1RefName: string = "teacherId";

  readonly table2RefName: string = "Subject";
  readonly column2RefName: string = "subjectId";
}
