import chalk from "chalk";
import { Command } from "clipanion";
import { loadTasks } from "../utils/storage";

export class ListCommand extends Command {
  static paths = [["list"]];

  async execute() {
    // sample data
    const tasks = await loadTasks();
    tasks.forEach((task) => {
      const status = task.completed ? chalk.green("✓") : chalk.yellow("○");
      // HEADER: stdout in node
      this.context.stdout.write(`${status} ${task.id}: ${task.title}\n`);
    });
    return 0;
  }
}
