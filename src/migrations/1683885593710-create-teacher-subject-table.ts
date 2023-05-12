import {MigrationInterface} from "typeorm";
import {CreateManyToManyTableMigration} from "./abstracts/CreateManyToManyTableMigration";

export class createTeacherSubjectTable1683885593710 extends CreateManyToManyTableMigration implements MigrationInterface {
  public readonly tableName: string = "TeacherSubject";

  public readonly table1RefName: string = "User";
  public readonly column1RefName: string = "teacherId";

  public readonly table2RefName: string = "Subject";
  public readonly column2RefName: string = "subjectId";
}
