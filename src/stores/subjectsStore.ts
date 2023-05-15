import {create} from "zustand";
import {Subject} from "../backend/entities/Subject.entity";
import {BaseStore} from "./types/BaseStore";

export type SubjectsStore = {
  subjects: Subject[];
} & BaseStore;

export const useSubjectsStore = create<SubjectsStore>((set) => ({
  subjects: [],
  async getAll() {
    const subjects = await window.API.subjectService.getAll();
    console.log(subjects, "subjects")
    set({ subjects });
  },
  async clean() {
    set({ subjects: [] });
  },
}));
