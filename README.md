# Typed Task Tracker

A type-safe task management data layer built with **TypeScript**, focused on immutable data, safe input validation, asynchronous state management, race-condition prevention, and reliable testing.

**Program:** AI-Assisted Software Development Internship — Week 1  
**Assignment:** JavaScript and TypeScript Essentials (Extended Edition)  
**Project type:** Individual assignment  
**Repository:** [Task-Tracker-Ts](https://github.com/mirzayasirabdullahbaig07/Task-Tracker-Ts)

## Overview

Typed Task Tracker is designed to demonstrate how to build a reliable task-tracking feature when data can be loading, empty, successful, or unavailable due to an error.

The project uses a simulated, in-memory API instead of a real backend. It focuses on correctness, strong TypeScript typing, safe state transitions, resilient asynchronous operations, and a disciplined GitHub development workflow.

## Key Requirements

The project is being developed around the following requirements:

- **Generic asynchronous state:** Model loading, empty, error, and success states with a discriminated union.
- **Type-safe data modeling:** Define immutable tasks, branded task IDs, priority levels, dates, and readonly tags.
- **Input validation:** Validate untrusted data, collect multiple validation errors, and safely parse task lists.
- **Reliable asynchronous fetching:** Implement retries with exponential backoff and jitter, cancellation, timeouts, and stale-response protection.
- **Filtering and sorting:** Filter tasks by priority, completion status, tags, and creation date; support stable single-key and multi-key sorting.
- **Pagination:** Load task pages, remove duplicates, handle overlapping results, and preserve previously loaded data when a later page fails.
- **State management:** Implement a framework-free store with optimistic updates, rollback on failure, subscriptions, and predictable state transitions.
- **Caching and search:** Support TTL-based caching, stale-while-revalidate, request de-duplication, debounced search, and cancellation.
- **Safe rendering and statistics:** Escape user-provided HTML content, render each asynchronous state clearly, and calculate task statistics.
- **Automated quality checks:** Configure strict TypeScript, ESLint, Prettier, meaningful tests, coverage thresholds, and GitHub Actions CI.

## Technology Stack

- TypeScript
- Node.js
- npm
- Git and GitHub
- ESLint
- Prettier
- TypeScript testing framework (as configured in the project)
- GitHub Actions

No frontend framework, real database, or backend server is required for this assignment.

## Project Structure

```text
src/
├── types.ts       # Core types and asynchronous state
├── validation.ts  # Validation of untrusted task data
├── api.ts         # Simulated in-memory API
├── fetcher.ts     # Fetching, retries, timeouts and cancellation
├── filters.ts     # Filtering, sorting and grouping
├── pagination.ts  # Cursor-based pagination
├── store.ts       # State store and optimistic updates
├── cache.ts       # TTL cache and revalidation
├── search.ts      # Debounced, cancellable search
├── render.ts      # Safe HTML rendering
└── stats.ts       # Task statistics

tests/             # Unit and behavior tests
.github/workflows/ # Automated CI workflow
```

This is the target structure; files should be added as the corresponding modules are implemented.

## Getting Started

### Prerequisites

- Node.js with npm
- Git
- Visual Studio Code (recommended)

### Installation

Clone the repository and enter its root directory:

```bash
git clone https://github.com/mirzayasirabdullahbaig07/Task-Tracker-Ts.git
cd Task-Tracker-Ts
npm install
```

If the repository is already open locally, run the commands from the directory containing the intended `package.json`.

### Development Commands

The following commands should be available after the corresponding npm scripts and tooling are configured:

```bash
npm run typecheck
npm run lint
npm test
npm run test:coverage
```

Run these checks before opening a pull request. Do not consider a check successful until its command has actually passed.

## Type Safety and Reliability

The implementation is expected to enforce strict TypeScript checks, including `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`.

The design also aims to ensure that:

- Task objects and input arrays are not mutated.
- Invalid external data is rejected with useful validation errors.
- Stale asynchronous responses cannot overwrite newer results.
- Failed optimistic updates restore the appropriate prior state.
- User-supplied text is escaped before being included in HTML.
- Tests verify behavior, edge cases, cancellation, and failure recovery.

## Testing and Continuous Integration

The assignment requires meaningful automated tests covering validation, state transitions, sorting, filtering, pagination, concurrency, caching, search, rollback, and safe rendering.

The target coverage thresholds are:

- **Lines:** at least 85%
- **Branches:** at least 80%

GitHub Actions should run installation, linting, type checking, and tests for every pull request. The project should be submitted for final review only when local checks and CI are passing.

## GitHub Workflow

Development should follow a feature-branch workflow:

1. Start from an up-to-date `main` branch.
2. Create a feature branch for a focused module or requirement group.
3. Implement and test the change.
4. Review the changes with `git diff`.
5. Commit with a descriptive Conventional Commit message.
6. Push the feature branch.
7. Open a Draft Pull Request against `main`.
8. Request review from the assigned reviewer, `shameershahzad`.
9. Address review feedback and ensure CI passes.
10. Mark the pull request ready for review and merge only after the required approval.

At least three separate pull requests and twelve focused commits are expected by the assignment instructions.

## Learning Objectives

This project is intended to strengthen practical understanding of:

- TypeScript generics, discriminated unions, branded types, and exhaustive checking
- Functional programming and immutable data transformations
- Validation at external data boundaries
- Asynchronous programming, cancellation, retries, and race conditions
- Testing failure cases and concurrent operations
- Automated quality gates and collaborative code review
- Responsible use of AI-assisted software development

## Learning Log

A separate `LEARNING_LOG.md` should document the implementation process, the most challenging requirement, an AI-generated mistake that was caught and corrected, a design decision that could be improved, and the final commit SHA.

## Author

**Mirza Yasir Abdullah Baig**

- GitHub: [@mirzayasirabdullahbaig07](https://github.com/mirzayasirabdullahbaig07)
- Project: [Task-Tracker-Ts](https://github.com/mirzayasirabdullahbaig07/Task-Tracker-Ts)

---

*This README documents the assignment requirements and intended design. Features, tests, coverage thresholds, and CI status should be described as completed only after they have been implemented and verified.*
