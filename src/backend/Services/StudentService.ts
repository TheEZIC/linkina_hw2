import {repo} from "../Repo";
import {In} from "typeorm";
import {userService} from "./UserService";

export const studentService = {
  getAll() {
    return userService.getByRole("student");
  },
  async setGroup(studentIds: number[], groupId?: number) {
    const userRepository = repo.getForUser();
    const groupRepository = repo.getForStudentGroup();

    let dbUsers = await userRepository.find({
      where: {
        id: In(studentIds),
        role: "student",
      },
      relations: {
        social: true,
        group: true,
      },
    });

    if (groupId) {
      const dbGroup = await groupRepository.findOne({
        where: {
          id: groupId,
        },
        relations: {
          students: true,
        }
      });

      dbGroup.students.push(...dbUsers);
      await groupRepository.save(dbGroup);
    } else {
      dbUsers = dbUsers.map((dbu) => {
        dbu.group = undefined;
        return dbu;
      });

      await userRepository.save(dbUsers);
    }
  },
};
