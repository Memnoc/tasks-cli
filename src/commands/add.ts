import { Command, Option } from "clipanion";
import pkg from "enquirer";
const { prompt } = pkg;
import chalk from "chalk";
import { generateId, loadTasks, saveTasks } from "../utils/storage";
import { Task, TaskStatus } from "../types/TaskStatus";
import alert from "better-cli-alerts";

interface PromptResponse extends Task {
  title: string;
  completed: boolean;
}

export class AddCommand extends Command {
  static paths = [["add"]];
  title = Option.String("--title", { required: false }) ?? "";

  async execute() {
    try {
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
        deleted: false,
        status: TaskStatus.PENDING,
      };

      await saveTasks([...tasks, newTask]);
      // this.context.stdout.write(chalk.green());

      alert({
        type: "success",
        message: "Task added successfully",
        description: "SUCCESS",
      });

      return 0;
    } catch (err: unknown) {
      // type assertion for now
      const error = (err as Error).message ?? "Unknown error";
      alert({
        type: "error",
        message: error,
        description: "ERROR",
      });
      return 1;
    }
  }
}
