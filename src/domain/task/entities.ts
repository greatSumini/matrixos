export interface Task {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  dueDate?: Date;
  isCompleted: boolean;
  priority?: "high" | "medium" | "low";
  status?: "todo" | "in-progress" | "done";
  quadrant?:
    | "urgent-important"
    | "not-urgent-important"
    | "urgent-not-important"
    | "not-urgent-not-important";
  tags: string[];
  parentId?: string;
  subtasks: string[]; // 하위 태스크 ID 참조
  goalId?: string; // 목표 연결
}
