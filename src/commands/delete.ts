import { Command, Option } from "clipanion";
import { loadTasks, saveTasks } from "../utils/storage";
import alert from "better-cli-alerts";

export class DeleteCommand extends Command {
  static paths = [["delete"]];
  id = Option.String();
  force = Option.Boolean("--force", false);

  async execute() {
    const tasks = await loadTasks();
    const taskIndex = tasks.findIndex((t) => t.id === this.id);

    if (taskIndex === -1) {
      alert({
        type: "error",
        message: `Task ${this.id} not found\n`,
        description: "ERROR",
      });
      return 1;
    }

    const [deletedTask] = tasks.splice(taskIndex, 1);
    await saveTasks(tasks);

    alert({
      type: "warning",
      message: `Deleted task: ${deletedTask.title}`,
      description: "FYI..",
    });
    return 0;
  }
}
