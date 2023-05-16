import {Task} from "../backend/entities/Task.entity";
import {create} from "zustand";

type TasksStore = {
  tasks: Task[];
  getAllForSubject: (subjectId: number) => Promise<void>;
  clean: () => void;
};

export const useTasksStore = create<TasksStore>((set) => ({
  tasks: [],
  async getAllForSubject(subjectId: number) {
    const tasks = await window.API.taskService.getAllForSubject(subjectId);
    set({ tasks });
  },
  clean() {
    set({ tasks: [] });
  },
}));
