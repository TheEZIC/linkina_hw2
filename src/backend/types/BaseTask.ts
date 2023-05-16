import {Task} from "../entities/Task.entity";

export type BaseTask = Omit<Task, "id" | "results" | "subject">;
