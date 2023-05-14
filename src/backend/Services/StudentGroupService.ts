import {database} from "../Database";
import {StudentGroup} from "../entities/StudentGroup.entity";

export const studentGroupService = {
  getStudentGroupRepository() {
    return database.getDataSource().getRepository(StudentGroup);
  },
  getAll() {
    const repository = studentGroupService.getStudentGroupRepository();

    return repository.find({
      relations: {
        students: true,
      },
    });
  },
  create(groupData: Omit<StudentGroup, "id" | "students">) {
    const repository = studentGroupService.getStudentGroupRepository();
    const group = repository.create(groupData);

    return repository.save(group);
  },
  update(groupId: number, groupData: Partial<Omit<StudentGroup, "id" | "students">>) {
    const repository = studentGroupService.getStudentGroupRepository();
    const group = repository.create({
      id: groupId,
      ...groupData,
    });

    return repository.save(group);
  },
  delete(groupId: number) {
    const repository = studentGroupService.getStudentGroupRepository();
    return repository.delete(groupId);
  }
};
