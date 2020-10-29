export function makeArray<T extends {}>(item: T | T[]): T[] {
  return Array.isArray(item) ? item : [item];
}
