import {database} from "./Database";
import {User} from "./entities/User.entity";
import {UserCredential} from "./entities/UserCredential.entity";
import {StudentGroup} from "./entities/StudentGroup.entity";
import {UserSocial} from "./entities/UserSocial.entity";
import {Subject} from "./entities/Subject.entity";
import {Task} from "./entities/Task.entity";
import {TaskResult} from "./entities/TaskResult.entity";
import {Repository} from "typeorm";

export const repo = {
  getForUser() {
    return repo.getFor<User>(User)
  },
  getForUserCredential() {
    return repo.getFor<UserCredential>(UserCredential);
  },
  getForUserSocial() {
    return repo.getFor<UserSocial>(UserSocial);
  },
  getForStudentGroup() {
    return repo.getFor<StudentGroup>(StudentGroup)
  },
  getForSubject() {
    return repo.getFor<Subject>(Subject);
  },
  getForTask() {
    return repo.getFor<Task>(Task);
  },
  getForTaskResult() {
    return repo.getFor<TaskResult>(TaskResult);
  },
  getFor<T>(entity: any) {
    return database.getDataSource().getRepository(entity) as Repository<T>;
  },
};
