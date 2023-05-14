import {database} from "./Database";
import {authService} from "./Services/AuthService";
import {studentGroupService} from "./Services/StudentGroupService";
import {studentService} from "./Services/StudentService";
import {userService} from "./Services/UserService";
import {subjectService} from "./Services/SubjectService";

export const backend = {
  db: database,
  authService,
  userService,
  studentGroupService,
  studentService,
  subjectService,
};
