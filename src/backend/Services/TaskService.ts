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

    const students: User[] = dbSubject.groups.map((g) => g.students).flat(2);
    const teachers = [...dbSubject.teachers];

    // IDK why TypeORM deletes all relations if provide same value (array) as before in relation
    // So I decided to delete relation arrays before save
    delete dbSubject.groups;
    delete dbSubject.teachers;

    let task = taskRepository.create(taskData);
    const results: TaskResult[] = [];

    for (const teacher of teachers) {
      for (const student of students) {
        const taskResult = taskResultRepository.create({
          teacher,
          student,
          task,
          status: "",
        });

        results.push(taskResult);
      }
    }

    task = taskRepository.create({
      ...task,
      results,
    });

    dbSubject.tasks = [...dbSubject.tasks, task];

    await database.getDataSource().manager.save(dbSubject);
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
