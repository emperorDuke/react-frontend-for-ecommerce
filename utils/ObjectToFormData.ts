export type Options = {
  indices?: boolean;
  nullsAsUndefineds?: boolean;
  booleansAsIntegers?: boolean;
  allowEmptyArrays?: boolean;
};

export type Serialize <T = {}> = (
  object: T,
  options?: Options,
  existingFormData?: FormData,
  keyPrefix?: string,
) => FormData;

// export const isUndefined = (value: any) => value === undefined;

// const isNull = (value: any) => value === null;

// function isBoolean<T>(value: T) {return typeof value === 'boolean'};

// const isObject = (value: any) => value === Object(value);

// const isArray = (value: any) => Array.isArray(value);

// const isDate = (value: any) => value instanceof Date;

// const isBlob = (value: any) =>
//   value &&
//   typeof value.size === 'number' &&
//   typeof value.type === 'string' &&
//   typeof value.slice === 'function';

// const isFile = (value: any) =>
//   isBlob(value) &&
//   typeof value.name === 'string' &&
//   (typeof value.lastModifiedDate === 'object' ||
//     typeof value.lastModified === 'number');

// export function serialize<T extends Array<any>|Object|Date|undefined|null|{[key: string]: } >(obj: T, cfg?: Options, fd?: FormData , pre: string = "pre") {
//   cfg = cfg || {};

//   cfg.indices = isUndefined(cfg.indices) ? false : cfg.indices;

//   cfg.nullsAsUndefineds = isUndefined(cfg.nullsAsUndefineds)
//     ? false
//     : cfg.nullsAsUndefineds;

//   cfg.booleansAsIntegers = isUndefined(cfg.booleansAsIntegers)
//     ? false
//     : cfg.booleansAsIntegers;

//   cfg.allowEmptyArrays = isUndefined(cfg.allowEmptyArrays)
//     ? false
//     : cfg.allowEmptyArrays;

//   fd = fd || new FormData();

//   if (isUndefined(obj)) {
//     return fd;
//   } else if (isNull(obj)) {
//     if (!cfg.nullsAsUndefineds) {
//       fd.append(pre, '');
//     }
//   } else if (isBoolean(obj)) {
//     if (cfg.booleansAsIntegers) {
//       fd.append(pre, obj ? "1" : "0");
//     } else {
//       fd.append(pre, obj);
//     }
//   } else if (isArray(obj)) {
//     if (obj.length) {
//       obj.forEach((value, index) => {
//         const key = pre + '[' + (cfg.indices ? index : '') + ']';

//         serialize(value, cfg, fd, key);
//       });
//     } else if (cfg.allowEmptyArrays) {
//       fd.append(pre + '[]', '');
//     }
//   } else if (isDate(obj)) {
//     fd.append(pre, obj.toISOString());
//   } else if (isObject(obj) && !isFile(obj) && !isBlob(obj)) {
//     Object.keys(obj).forEach((prop) => {
//       const value = obj[prop];

//       if (isArray(value)) {
//         while (prop.length > 2 && prop.lastIndexOf('[]') === prop.length - 2) {
//           prop = prop.substring(0, prop.length - 2);
//         }
//       }

//       const key = pre ? pre + '[' + prop + ']' : prop;

//       serialize(value, cfg, fd, key);
//     });
//   } else {
//     fd.append(pre, obj);
//   }

//   return fd;
// };
