# Tasks CLI

A simple command-line task manager built with TypeScript and Clipanion.

## Features

Add tasks interactively or via command line arguments
List tasks with completion status
Mark tasks as complete
Persistent storage using JSON

## Tech Stack

**Clipanion** - CLI framework with type-safe argument parsing
**Enquirer** - Interactive command-line prompts
**Chalk** - Terminal string styling
**Nanoid** - ID generation
**tsup** - Zero-config TypeScript bundler

## Project Structure

.
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
├── src
│ ├── cli.ts
│ ├── commands
│ │ ├── add.ts
│ │ ├── complete.ts
│ │ ├── delete.ts
│ │ └── list.ts
│ ├── types
│ │ └── TaskStatus.ts
│ └── utils
│ └── storage.ts
├── tests
│ └── commands
├── tsconfig.json
└── tsup.config.ts

## Development

```bash
# Watch mode
npm run dev

# Build
npm run build
```

### Installation

```bash
git clone <repository-url>
cd tasks-cli
npm install
npm run build
npm link
```

### Commands

```bash
# Add a new task
tasks add
tasks add --title "Buy groceries"

# List all tasks
tasks list

# Complete a task
tasks complete <task-id>

# Show help
tasks --help

```
