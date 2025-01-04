import chalk from "chalk";
import { Command } from "clipanion";
import { loadTasks } from "../utils/storage";
import { TaskStatus } from "../types/TaskStatus";

// INFO: Prepferable to switch over statuse in an enum
const getStatusSymbol = (status: TaskStatus): string => {
  switch (status) {
    case TaskStatus.PENDING:
      return chalk.yellow("○");
    case TaskStatus.IN_PROGRESS:
      return chalk.blue("▶");
    case TaskStatus.COMPLETED:
      return chalk.green("✓");
    case TaskStatus.CANCELLED:
      return chalk.red("✕");
    default:
      return chalk.gray("?");
  }
};

export class ListCommand extends Command {
  static paths = [["list"]];

  async execute() {
    const tasks = await loadTasks();
    tasks.forEach((task) => {
      const status = getStatusSymbol(task.status);
      // HEADER: stdout in node
      this.context.stdout.write(`${status} ${task.id}: ${task.title}\n`);
    });
    return 0;
  }
}
