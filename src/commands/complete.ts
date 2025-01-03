import { Command, Option } from "clipanion";
import chalk from "chalk";
import { loadTasks, saveTasks } from "../utils/storage";

export class CompleteCommand extends Command {
  static paths = [["complete"]];
  static usage = Command.Usage({
    description: "Mark a task as completed",
    examples: [["Complete a task", "tasks complete 1234"]],
  });

  id = Option.String();

  async execute() {
    const tasks = await loadTasks();
    this.context.stdout.write(`Looking for task with ID: '${this.id}'\n`);
    this.context.stdout.write(
      `Available IDs: ${tasks.map((t) => `'${t.id}'`).join(", ")}\n`,
    );

    const taskIndex = tasks.findIndex((t) => t.id === this.id);
    if (taskIndex === -1) {
      this.context.stdout.write(chalk.red(`Task ${this.id} not found\n`));
      return 1;
    }

    tasks[taskIndex].completed = true;
    await saveTasks(tasks);
    this.context.stdout.write(
      chalk.green(`Completed task:${tasks[taskIndex].title}\n`),
    );
  }
}
