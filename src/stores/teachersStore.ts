import {BaseStore} from "./types/BaseStore";
import {BaseUser} from "../backend/types";
import {create} from "zustand";

type TeachersStore = {
  teachers: BaseUser[];
} & BaseStore;

export const useTeachersStore = create<TeachersStore>((set) => ({
  teachers: [],
  async getAll() {
    const teachers = await window.API.teacherService.getAll();
    console.log(teachers, "teachers")
    set({ teachers });
  },
  clean() {
    set({ teachers: [] });
  },
}));
