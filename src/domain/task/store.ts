import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";
import { Task } from "./entities";
import { taskRepository } from "./repository";

interface TaskState {
  tasks: Record<string, Task>;
  isLoading: boolean;
  selectedTaskId: string | null;
  view: "list" | "matrix";
  dateFilter: "today" | "week" | "month" | "custom";
  customDateRange?: { start: Date; end: Date };

  // 액션
  loadTasks: () => Promise<void>;
  addTask: (
    task: Omit<Task, "id" | "createdAt" | "subtasks" | "isCompleted">
  ) => Promise<string>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleComplete: (id: string) => Promise<void>;
  setQuadrant: (id: string, quadrant: Task["quadrant"]) => Promise<void>;
  setView: (view: "list" | "matrix") => void;
  setDateFilter: (
    filter: TaskState["dateFilter"],
    customRange?: { start: Date; end: Date }
  ) => void;
}

export const useTaskStore = create<TaskState>()(
  immer((set, get) => ({
    tasks: {},
    isLoading: false,
    selectedTaskId: null as string | null,
    view: "list" as const,
    dateFilter: "today" as const,

    loadTasks: async () => {
      set({ isLoading: true });
      try {
        const tasks = await taskRepository.getAll();
        const tasksRecord = tasks.reduce((acc, task) => {
          acc[task.id] = task;
          return acc;
        }, {} as Record<string, Task>);

        set({ tasks: tasksRecord, isLoading: false });
      } catch (error) {
        console.error("Failed to load tasks:", error);
        set({ isLoading: false });
      }
    },

    addTask: async (taskData) => {
      const id = uuidv4();
      const newTask: Task = {
        ...taskData,
        id,
        createdAt: new Date(),
        isCompleted: false,
        subtasks: [],
        tags: taskData.tags || [],
      };

      set((state) => {
        state.tasks[id] = newTask;
      });

      // 저장소에 저장
      await taskRepository.save(newTask);
      return id;
    },

    updateTask: async (id, taskData) => {
      set((state) => {
        if (state.tasks[id]) {
          Object.assign(state.tasks[id], taskData);
        }
      });

      // 업데이트된 태스크 가져오기
      const updatedTask = get().tasks[id];
      if (updatedTask) {
        await taskRepository.save(updatedTask);
      }
    },

    deleteTask: async (id) => {
      set((state) => {
        delete state.tasks[id];
      });

      await taskRepository.delete(id);
    },

    toggleComplete: async (id) => {
      set((state) => {
        if (state.tasks[id]) {
          state.tasks[id].isCompleted = !state.tasks[id].isCompleted;
        }
      });

      const updatedTask = get().tasks[id];
      if (updatedTask) {
        await taskRepository.save(updatedTask);
      }
    },

    setQuadrant: async (id, quadrant) => {
      set((state) => {
        if (state.tasks[id]) {
          state.tasks[id].quadrant = quadrant;
        }
      });

      const updatedTask = get().tasks[id];
      if (updatedTask) {
        await taskRepository.save(updatedTask);
      }
    },

    setView: (view) => {
      set((state) => {
        state.view = view;
      });
    },

    setDateFilter: (filter, customRange) => {
      set((state) => {
        state.dateFilter = filter;
        state.customDateRange = customRange;
      });
    },
  }))
);
