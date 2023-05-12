import {DataSource, DataSourceOptions} from "typeorm/browser";
import {createUserTable1683744711160} from "./src/migrations/1683744711160-create-user-table";
import {createUserCredentialTable1683745615003} from "./src/migrations/1683745615003-create-user-credential-table";
import {createUserSocialTable1683745811039} from "./src/migrations/1683745811039-create-user-social-table";
import {createSubjectTable1683745950053} from "./src/migrations/1683745950053-create-subject-table";
import {createTaskTable1683746640652} from "./src/migrations/1683746640652-create-task-table";
import {createTaskResultTable1683746877875} from "./src/migrations/1683746877875-create-task-result-table";
import {createStudentGroupTable1683749388340} from "./src/migrations/1683749388340-create-student-group-table";
import {createMessageTable1683749388350} from "./src/migrations/1683749388350-create-message-table";
import {createUserRelations1683818829907} from "./src/migrations/1683818829907-create-user-relations";
import {createTaskRelations1683819882678} from "./src/migrations/1683819882678-create-task-relations";
import {createTeacherSubjectTable1683885593710} from "./src/migrations/1683885593710-create-teacher-subject-table";
import {createMessageRelations1683825286528} from "./src/migrations/1683825286528-create-message-relations";
import {
  createStudentGroupSubjectTable1683887109681
} from "./src/migrations/1683887109681-create-student-group-subject-table";

export const OrmConfig: DataSourceOptions = {
  type: "better-sqlite3",
  database: "./db.sqlite",
  entities: ["./*.entity.{js,ts}"],
  migrations: [
    createUserTable1683744711160,
    createUserCredentialTable1683745615003,
    createUserSocialTable1683745811039,
    createSubjectTable1683745950053,
    createTaskTable1683746640652,
    createTaskResultTable1683746877875,
    createStudentGroupTable1683749388340,
    createMessageTable1683749388350,
    createUserRelations1683818829907,
    createMessageRelations1683825286528,
    createTaskRelations1683819882678,
    createTeacherSubjectTable1683885593710,
    createStudentGroupSubjectTable1683887109681,
  ],
};

export default new DataSource(OrmConfig);
