import fs from "node:fs/promises";
import { customAlphabet } from "nanoid";
import { Task } from "../types/TaskStatus";

// HEADER: a simpler ID system for the user
export const generateId = customAlphabet("123456789", 4);

export async function loadTasks(): Promise<Task[]> {
  try {
    const data = await fs.readFile("./tasks.json", "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await fs.writeFile("./tasks.json", JSON.stringify(tasks, null, 2));
}
