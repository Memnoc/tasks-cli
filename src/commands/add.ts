import { Command, Option } from "clipanion";
import pkg from "enquirer";
const { prompt } = pkg;
import chalk from "chalk";
import { nanoid } from "nanoid";
import { generateId, loadTasks, saveTasks } from "../utils/storage";
import { Task } from "../utils/storage";

interface PromptResponse extends Task {
  title: string;
  completed: boolean;
}

export class AddCommand extends Command {
  static paths = [["add"]];
  title = Option.String("--title", { required: false }) ?? "";

  async execute() {
    const tasks = await loadTasks();

    const title =
      this.title ||
      (await prompt<PromptResponse>({
        type: "input",
        name: "title",
        message: "Task title:",
      }).then((res) => res.title));

    const newTask: Task = {
      id: generateId(),
      title,
      completed: false,
    };

    await saveTasks([...tasks, newTask]);
    this.context.stdout.write(chalk.green());
    return 0;
  }
}
