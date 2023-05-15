import {database} from "./Database";
import {authService} from "./Services/AuthService";
import {studentGroupService} from "./Services/StudentGroupService";
import {studentService} from "./Services/StudentService";
import {userService} from "./Services/UserService";
import {subjectService} from "./Services/SubjectService";
import {teacherService} from "./Services/TeacherService";

export const backend = {
  db: database,
  authService,
  userService,
  teacherService,
  studentService,
  studentGroupService,
  subjectService,
};
