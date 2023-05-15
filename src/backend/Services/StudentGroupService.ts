import {repo} from "../Repo";
import {BaseStudentGroup} from "../types";

export const studentGroupService = {
  getAll() {
    const repository = repo.getForStudentGroup();

    return repository.find({
      relations: {
        students: true,
      },
    });
  },
  create(groupData: BaseStudentGroup) {
    const repository = repo.getForStudentGroup();
    const group = repository.create(groupData);

    return repository.save(group);
  },
  update(groupId: number, groupData: BaseStudentGroup) {
    const repository = repo.getForStudentGroup();
    const group = repository.create({
      id: groupId,
      ...groupData,
    });

    return repository.save(group);
  },
  delete(groupId: number) {
    const repository = repo.getForStudentGroup();

    return repository.delete(groupId);
  }
};
