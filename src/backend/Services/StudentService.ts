import {repo} from "../Repo";
import {In} from "typeorm";

export const studentService = {
  getAll() {
    const repository = repo.getForUser();

    return repository.find({
      where: {
        role: "student",
      },
      relations: {
        social: true,
        group: true,
      },
    });
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
