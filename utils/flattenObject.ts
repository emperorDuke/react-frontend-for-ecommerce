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
    if (obj[key] instanceof Object) {
      flatten(obj[key], bag);
    } else {
      Object.defineProperty(bag, key, {
        value: obj[key],
      });
    }
  }
  return bag;
}
