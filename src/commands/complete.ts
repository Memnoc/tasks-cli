import { Command, Option } from "clipanion";
import chalk from "chalk";
import { loadTasks, saveTasks } from "../utils/storage";
import { TaskStatus } from "../types/TaskStatus";
import alert from "better-cli-alerts";

export class CompleteCommand extends Command {
  static paths = [["complete"]];
  static usage = Command.Usage({
    description: "Mark a task as completed",
    examples: [["Complete a task", "tasks complete 1234"]],
  });

  id = Option.String();

  async execute() {
    const tasks = await loadTasks();

    const taskIndex = tasks.findIndex((t) => t.id === this.id);
    if (taskIndex === -1) {
      alert({
        type: "error",
        message: `Task ${this.id} not found`,
        description: "OOPS :(",
      });
      return 1;
    }

    tasks[taskIndex].status = TaskStatus.COMPLETED;
    await saveTasks(tasks);

    alert({
      type: "success",
      message: `Completed task:${tasks[taskIndex].title}`,
      description: "YAY :)",
    });
  }
}
