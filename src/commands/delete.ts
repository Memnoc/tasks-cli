import { Command, Option } from "clipanion";
import chalk from "chalk";
import { loadTasks, saveTasks } from "../utils/storage";

export class DeleteCommand extends Command {
  static paths = [["delete"]];
  id = Option.String();
  force = Option.Boolean("--force", false);

  async execute() {
    const tasks = await loadTasks();
    const taskIndex = tasks.findIndex((t) => t.id === this.id);

    if (taskIndex === -1) {
      this.context.stdout.write(chalk.red(`Task ${this.id} not found\n`));
      return 1;
    }

    const [deletedTask] = tasks.splice(taskIndex, 1);
    await saveTasks(tasks);
    this.context.stdout.write(
      chalk.green(`Deleted task: ${deletedTask.title}\n`),
    );
    return 0;
  }
}
