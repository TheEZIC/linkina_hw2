import {create} from "zustand";
import {StudentGroup} from "../backend/entities/StudentGroup.entity";
import {BaseStore} from "./types/BaseStore";

export type GroupsStore = {
  groups: StudentGroup[],
} & BaseStore;

export const useGroupsStore = create<GroupsStore>((set) => ({
  groups: [],
  async getAll() {
    const groups = await window.API.studentGroupService.getAll();
    set({ groups });
  },
  clean() {
    set({ groups: [] });
  },
}));
