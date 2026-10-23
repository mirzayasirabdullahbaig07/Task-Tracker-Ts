import { Task, TaskId, TaskPriority } from "./types";

export type Result<T> = 
  | { readonly ok: true; readonly task: T }
  | { readonly ok: false; readonly errors: string[] };

export function parseTask(raw: unknown): Result<Task> {
  const errors: string[] = [];

  if (!raw || typeof raw !== "object") {
    return { ok: false, errors: ["Input must be an object."] };
  }

  const obj = raw as Record<string, unknown>;

  // 1. Validate ID
  if (typeof obj.id !== "string" || obj.id.trim() === "") {
    errors.push("id is missing or not a non-empty string.");
  }

  // 2. Validate Title
  if (typeof obj.title !== "string" || obj.title.trim() === "") {
    errors.push("title is empty or whitespace-only.");
  } else if (obj.title.length > 120) {
    errors.push("title is longer than 120 characters.");
  }

  // 3. Validate Priority
  const validPriorities: TaskPriority[] = ["low", "medium", "high"];
  if (typeof obj.priority !== "string" || !validPriorities.includes(obj.priority as TaskPriority)) {
    errors.push("priority is not one of the allowed values.");
  }

  // 4. Validate Tags
  if (!Array.isArray(obj.tags) || !obj.tags.every(t => typeof t === "string")) {
    errors.push("tags is not an array of strings.");
  }

  // 5. Validate Dates (createdAt and completedAt)
  const parseDate = (val: unknown, fieldName: string): Date | null | undefined => {
    if (val === null) return null;
    if (typeof val !== "string" && typeof val !== "number" && !(val instanceof Date)) {
      errors.push(`${fieldName} must be a valid date or null.`);
      return undefined;
    }
    const d = new Date(val as string | number | Date);
    if (Number.isNaN(d.getTime())) {
      errors.push(`${fieldName} is not a valid date.`);
      return undefined;
    }
    return d;
  };

  const createdAt = parseDate(obj.createdAt, "createdAt");
  const completedAt = parseDate(obj.completedAt, "completedAt");

  if (createdAt === null) {
    errors.push("createdAt cannot be null.");
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    task: {
      id: obj.id as TaskId,
      title: obj.title as string,
      priority: obj.priority as TaskPriority,
      createdAt: createdAt as Date,
      completedAt: completedAt as Date | null,
      tags: obj.tags as string[],
    },
  };
}

export function parseTaskList(raw: unknown): { tasks: Task[]; rejected: { index: number; errors: string[] }[] } {
  if (!Array.isArray(raw)) {
    return { tasks: [], rejected: [{ index: -1, errors: ["Input list is not an array."] }] };
  }

  const tasks: Task[] = [];
  const rejected: { index: number; errors: string[] }[] = [];

  raw.forEach((item, index) => {
    const result = parseTask(item);
    if (result.ok) {
      tasks.push(result.task);
    } else {
      rejected.push({ index, errors: result.errors });
    }
  });

  return { tasks, rejected };
}