#!/usr/bin/env node
import { Cli } from "clipanion";
import { ListCommand } from "./commands/list";
import { AddCommand } from "./commands/add";
import { CompleteCommand } from "./commands/complete";
import { DeleteCommand } from "./commands/delete";

const cli = new Cli({
  binaryName: "tasks",
  binaryVersion: "1.0.0",
});

cli.register(ListCommand);
cli.register(AddCommand);
cli.register(CompleteCommand);
cli.register(DeleteCommand);
cli.run(process.argv.slice(2));
