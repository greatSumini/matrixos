import { Task } from "./entities";
import { storeClient } from "../../infrastructure/storage/storeClient";

export interface TaskRepository {
  getAll(): Promise<Task[]>;
  getById(id: string): Promise<Task | null>;
  save(task: Task): Promise<void>;
  delete(id: string): Promise<void>;
  getByDateRange(startDate: Date, endDate: Date): Promise<Task[]>;
  getByQuadrant(quadrant: Task["quadrant"]): Promise<Task[]>;
  getByTag(tag: string): Promise<Task[]>;
}

export const taskRepository: TaskRepository = {
  async getAll(): Promise<Task[]> {
    const tasks = await storeClient.getTasks();
    return Object.values(tasks);
  },

  async getById(id: string): Promise<Task | null> {
    return storeClient.getTask(id);
  },

  async save(task: Task): Promise<void> {
    await storeClient.setTask(task.id, task);
  },

  async delete(id: string): Promise<void> {
    await storeClient.deleteTask(id);
  },

  async getByDateRange(startDate: Date, endDate: Date): Promise<Task[]> {
    const tasks = await this.getAll();
    return tasks.filter((task: Task) => {
      if (!task.dueDate) return false;
      return task.dueDate >= startDate && task.dueDate <= endDate;
    });
  },

  async getByQuadrant(quadrant: Task["quadrant"]): Promise<Task[]> {
    const tasks = await this.getAll();
    return tasks.filter((task: Task) => task.quadrant === quadrant);
  },

  async getByTag(tag: string): Promise<Task[]> {
    const tasks = await this.getAll();
    return tasks.filter((task: Task) => task.tags.includes(tag));
  },
};
