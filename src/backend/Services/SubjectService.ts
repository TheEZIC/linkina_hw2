import {repo} from "../Repo";
import {BaseSubject} from "../types";
import {In, Not} from "typeorm";

export const subjectService = {
  getAll() {
    const repository = repo.getForSubject();

    return repository.find({
      relations: {
        teachers: true,
        tasks: true,
        groups: {
          students: true,
        },
      },
    });
  },
  getById(subjectId: number) {
    const repository = repo.getForSubject();

    return repository.findOne({
      where: {
        id: subjectId,
      },
      relations: {
        teachers: true,
        tasks: {
          results: true,
        },
        groups: {
          students: true,
        },
      },
    });
  },
  create(subjectData: BaseSubject) {
    const repository = repo.getForSubject();
    const subject = repository.create(subjectData);

    return repository.save(subject);
  },
  async assignGroups(groupsIds: number[], subjectId: number, remove = false) {
    const subjectRepository = repo.getForSubject();
    const groupRepository = repo.getForStudentGroup();
    const taskResultRepository = repo.getForTaskResult()

    let dbGroups = await groupRepository.find({
      where: {
        id: In(groupsIds),
      },
    });

    const subject = await subjectRepository.findOne({
      where: {
        id: subjectId,
      },
      relations: {
        groups: {
          students: true,
        },
      },
    });

    if (!remove) {
      subject.groups.push(...dbGroups);
    } else {
      subject.groups = subject.groups.filter((g) => groupsIds.includes(g.id));
    }

    console.log(subject, groupsIds, remove, "subject groups");

    await subjectRepository.save(subject);
  },
  async assignTeachers(teachersIds: number[], subjectId: number, remove = false) {
    const subjectRepository = repo.getForSubject();
    const userRepository = repo.getForUser();

    let dbUsers = await userRepository.find({
      where: {
        id: In(teachersIds),
        role: "teacher",
      },
    });

    const subject = await subjectRepository.findOne({
      where: {
        id: subjectId,
      },
      relations: {
        teachers: true,
      },
    });

    if (!remove) {
      subject.teachers.push(...dbUsers);
    } else {
      subject.teachers = subject.teachers.filter((s) => teachersIds.includes(s.id));
    }

    console.log(subject, teachersIds, remove, "subject teachers");

    await subjectRepository.save(subject);
  },
  update(subjectId: number, subjectData: BaseSubject) {
    const repository = repo.getForSubject();
    const subject = repository.create({
      id: subjectId,
      ...subjectData,
    });

    return repository.save(subject);
  },
  async delete(subjectId: number) {
    const repository = repo.getForSubject();
    await repository.delete(subjectId);
  },
};
