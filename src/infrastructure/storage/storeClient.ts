import { Task } from "../../domain/task/entities";

declare global {
  interface Window {
    storeApi: {
      getTasks: () => Promise<Record<string, Task>>;
      setTasks: (tasks: Record<string, Task>) => Promise<boolean>;
      getTask: (id: string) => Promise<Task>;
      setTask: (id: string, task: Task) => Promise<boolean>;
      deleteTask: (id: string) => Promise<boolean>;
      get: <T>(key: string) => Promise<T>;
      set: <T>(key: string, value: T) => Promise<boolean>;
    };
  }
}

export const storeClient = {
  getTasks: async (): Promise<Record<string, Task>> => {
    const tasks = await window.storeApi.getTasks();
    // JSON으로 직렬화/역직렬화 과정에서 Date 객체를 복원
    return Object.entries(tasks).reduce((acc, [id, task]) => {
      acc[id] = {
        ...task,
        createdAt: new Date(task.createdAt),
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      };
      return acc;
    }, {} as Record<string, Task>);
  },

  setTasks: async (tasks: Record<string, Task>): Promise<boolean> => {
    return window.storeApi.setTasks(tasks);
  },

  getTask: async (id: string): Promise<Task | null> => {
    const task = await window.storeApi.getTask(id);
    if (!task) return null;

    return {
      ...task,
      createdAt: new Date(task.createdAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
    };
  },

  setTask: async (id: string, task: Task): Promise<boolean> => {
    return window.storeApi.setTask(id, task);
  },

  deleteTask: async (id: string): Promise<boolean> => {
    return window.storeApi.deleteTask(id);
  },

  // 일반 저장소 접근 메서드
  get: async <T>(key: string): Promise<T> => {
    return window.storeApi.get(key);
  },

  set: async <T>(key: string, value: T): Promise<boolean> => {
    return window.storeApi.set(key, value);
  },
};
