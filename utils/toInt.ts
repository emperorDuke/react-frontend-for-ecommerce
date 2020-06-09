export const toInt = (id?: string | number) =>
  typeof id === "string" ? parseInt(id) : id;