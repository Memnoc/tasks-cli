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

src/
├── commands/
│ ├── add.ts # Add new tasks
│ ├── list.ts # List all tasks
│ └── complete.ts # Mark tasks as complete
├── utils/
│ └── storage.ts # Task persistence
├── types.ts # Shared types
└── cli.ts # CLI entry point

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
