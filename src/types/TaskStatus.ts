export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  deleted: boolean;
  status: TaskStatus;
}
