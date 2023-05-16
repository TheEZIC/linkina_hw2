import {BaseTask} from "../types/BaseTask";
import {repo} from "../Repo";
import {User} from "../entities/User.entity";
import {TaskResult} from "../entities/TaskResult.entity";
import {database} from "../Database";

export const taskService = {
  async create(subjectId: number, taskData: BaseTask) {
    const taskRepository = repo.getForTask();
    const taskResultRepository = repo.getForTaskResult();
    const subjectRepository = repo.getForSubject();

    await database.getDataSource().transaction(async () => {
      const dbSubject = await subjectRepository.findOne({
        where: {
          id: subjectId,
        },
        relations: {
          tasks: {
            results: true,
          },
          groups: {
            students: true,
          },
          teachers: true,
        },
      });

      const students = dbSubject.groups.map((g) => g.students).flat(2);
      const task = await taskRepository.save({
        ...taskData,
        subject: dbSubject,
      });

      const results: Partial<TaskResult>[] = [];

      for (const teacher of dbSubject.teachers) {
        for (const student of students) {
          results.push({
            teacher,
            task,
            student,
            status: "",
          });
        }
      }

      await taskResultRepository.save(results);
    });
  },
  getAllForSubject(subjectId: number) {
    console.log(subjectId, "subject id")
    const repository = repo.getForTask();

    return repository.find({
      where: {
        subject: {
          id: subjectId,
        }
      },
      relations: {
        results: true,
        subject: true,
      }
    });
  },
};
