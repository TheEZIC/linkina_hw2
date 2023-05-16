import {BaseTask} from "../types/BaseTask";
import {repo} from "../Repo";
import {User} from "../entities/User.entity";
import {TaskResult} from "../entities/TaskResult.entity";

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

    const task = taskRepository.create(taskData);
    const dbTask = await taskRepository.save(task);

    const results: TaskResult[] = [];

    for (const teacher of teachers) {
      for (const student of students) {
        const taskResult = taskResultRepository.create({
          teacher,
          student,
          task: dbTask,
          status: "",
        });

        results.push(taskResult);
      }
    }

    const dbResults = await taskResultRepository.save(results);
    dbTask.results = dbResults;
    dbSubject.tasks = [...dbSubject.tasks, dbTask];

    await subjectRepository.save(dbSubject);
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
