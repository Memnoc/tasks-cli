import chalk from "chalk";
import { Command, Option } from "clipanion";
import { loadTasks } from "../utils/storage";
import { TaskStatus } from "../types/TaskStatus";

// INFO: Prepferable to switch over statuses in an enum
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
  status = Option.String("--status", { required: false });
  static paths = [["list"], ["ls"]];
  static usage = Command.Usage({
    description: "List all tasks",
    examples: [
      ["List all tasks", "tasks list"],
      ["Short form", "tasks ls"],
    ],
  });

  async execute() {
    const tasks = await loadTasks();

    const filteredTasks = this.status
      ? tasks.filter((task) => task.status === this.status?.toUpperCase())
      : tasks;

    filteredTasks.forEach((task) => {
      const status = getStatusSymbol(task.status);
      this.context.stdout.write(`${status} ${task.id}: ${task.title}\n`);
    });
    return 0;
  }
}
