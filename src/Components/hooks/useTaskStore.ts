import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

export interface TaskState {
  name?: string;
  id: number;
  dateAdded?: Date;
  completed?: boolean;
}

export interface TaskListState {
  taskList: TaskState[];
}

interface TaskAction {
  addTask: (newTaskName: TaskState) => void;
  deleteTask: (id: number) => void;
  toggleComplete: (id: number) => void;
  clearTasks: () => void;
}

const useTaskStore = create<TaskListState & TaskAction>()(
  devtools(
    persist(
      (set, get) => ({
        taskList: [],
        addTask: (newTaskName) => {
          set({
            taskList: [...get().taskList, newTaskName],
          });
        },
        toggleComplete: (id) => {
          const updatedTask = get().taskList.map((task) => {
            if (task.id === id) {
              return { ...task, completed: !task.completed };
            } else {
              return task;
            }
          });
          set({ taskList: updatedTask });
        },
        deleteTask: (id) => {
          const updatedTask = get().taskList.filter((task) => task.id !== id);
          set({ taskList: updatedTask });
        },
        clearTasks: () => {
          set({ taskList: [] });
        },
      }),

      { name: "taskState" }
    )
  )
);

export default useTaskStore;
