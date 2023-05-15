import {StudentGroup} from "../entities/StudentGroup.entity";

export type BaseStudentGroup = Omit<StudentGroup, "id" | "students" | "subjects">
