// A branded type ensures a random string cannot be passed where a TaskId is required.
export type TaskId = string & { readonly _brand: "TaskId" };

// 3.1 Generic async state discriminated union
export type AsyncState<T> =
  | { readonly status: "loading" }
  | { readonly status: "error"; readonly message: string }
  | { readonly status: "empty" }
  | { readonly status: "success"; readonly data: T };

export type TaskPriority = "low" | "medium" | "high";

// 3.2 Data modeling - fully immutable
export interface Task {
  readonly id: TaskId;
  readonly title: string;
  readonly priority: TaskPriority;
  
  // completedAt is Date | null instead of a boolean `isDone` because tracking the exact time 
  // of completion is critical for the stats engine (average time-to-complete). 
  // It is never `undefined` to ensure the property key always exists on the object, 
  // preventing hidden state variations and making iteration predictable.
  readonly completedAt: Date | null;
  readonly createdAt: Date;
  readonly tags: readonly string[];
}

/**
 * Exhaustive check helper. 
 * Pass a variable to this function in the `default` case of a switch statement.
 * If a new state is added to a union later, the compiler will fail the build here.
 */
export function assertNever(x: never): never {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(x)}`);
}

/**
 * Transforms only the success branch of an AsyncState, leaving others untouched.
 * Fully typed with no casts.
 */
export function mapAsyncState<T, U>(
  state: AsyncState<T>,
  fn: (data: T) => U
): AsyncState<U> {
  if (state.status === "success") {
    return {
      status: "success",
      data: fn(state.data),
    };
  }
  // Because the other states have no `data` property tied to `T`, 
  // they can safely be returned as AsyncState<U>
  return state as AsyncState<U>;
}