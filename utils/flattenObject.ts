type FlattenObject = {
  [k: string]: any;
};

/**
 *  Flattens nested object to a one-level depth
 * @param obj Object to be flatten
 * @param bag Flatten Object
 */
export function flatten<T>(obj: T, bag: FlattenObject = {}) {
  for (let key in obj) {
    let value = obj[key];
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      bag[key] = value;
    } else {
      flatten(value, bag);
    }
  }
  return bag;
}
