import {Subject} from "../entities/Subject.entity";

export type BaseSubject = Omit<Subject, "id" | "groups" | "teachers" | "tasks">;
