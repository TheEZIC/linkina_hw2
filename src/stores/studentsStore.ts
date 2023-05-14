import {create} from "zustand";
import {BaseUser} from "../backend/types/BaseUser";
import {BaseStore} from "./types/BaseStore";

export type StudentsStore = {
  students: BaseUser[];
} & BaseStore;

export const useStudentsStore = create<StudentsStore>((set) => ({
  students: [],
  async getAll() {
    const students = await window.API.studentService.getAll();
    console.log(students, "students");
    set({ students });
  },
  clean() {
    set({ students: [] });
  },
}));
