import {BaseTask} from "../types/BaseTask";
import {repo} from "../Repo";
import {User} from "../entities/User.entity";
import {TaskResult} from "../entities/TaskResult.entity";
import {database} from "../Database";
import {UserRole} from "../types";

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
  update(taskId: number, taskData: BaseTask) {
    const repository = repo.getForTask();
    const task = repository.create({
      id: taskId,
      ...taskData,
    });

    return repository.save(task);
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
  getForStudent(taskId: number, userId: number) {
    const repository = repo.getForTask();

    return repository.findOne({
      where: {
        id: taskId,
        results: {
          student: {
            id: userId,
            role: "student"
          }
        }
      },
      relations: {
        results: {
          teacher: true,
          student: true,
        },
      },
    });
  },
  getForTeacher(taskId: number, userId: number) {
    const repository = repo.getForTask();

    return repository.findOne({
      where: {
        id: taskId,
        results: {
          teacher: {
            id: userId,
            role: "teacher"
          }
        }
      },
      relations: {
        results: {
          teacher: true,
          student: true,
        },
      },
    });
  },
  async setMark(taskResultId: number, mark: number) {
    const repository = repo.getForTaskResult();
    const dbTaskResult = await repository.findOne({
      where: {
        id: taskResultId,
      }
    });

    return repository.save({
      ...dbTaskResult,
      mark,
    });
  },
};
