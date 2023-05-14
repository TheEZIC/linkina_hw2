import {repo} from "../Repo";

export const subjectService = {
  getAll() {
    const repository = repo.getForSubject();

    return repository.find({
      relations: {
        teachers: true,
        tasks: true,
        studentGroups: {
          students: true,
        },
      },
    })
  },
};
