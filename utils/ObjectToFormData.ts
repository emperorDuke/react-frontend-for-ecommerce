const isFile = (obj: any) => obj instanceof File;
const isObject = (obj: any) => typeof obj === "object";
const isArray = (obj: any) => Array.isArray(obj);
const isString = (obj: any) => typeof obj === "string";
const isDate = (obj: any) => obj instanceof Date;
const isNull = (obj: any) => obj === null;
const isNumber = (obj: any) => obj instanceof Number;
const isBoolean = (obj: any) => typeof obj === "boolean";

/**
 * Convert a nested object into formdata
 * @param data
 * @param form
 * @param key
 */
export function toFormData(data: any, form?: FormData, key?: string) {
  let formKey = key || "";
  let formData = form || new FormData();

  if (isArray(data)) {
    if (data.length === 0) formData.append(formKey + "[]", "[]");

    for (let i = 0; i < data.length; i++) {
      let tempFormKey = formKey + "[" + i + "]";

      if (!isString(data[i])) { 
        if (isNull(data[i]) || isNumber(data[i]) || isBoolean(data[i])) {
          formData.append(tempFormKey, data[i]);
        } else {
          toFormData(data[i], formData, tempFormKey);
        }
      } else {
        formData.append(tempFormKey, data[i]);
      }
    }
  } else if (isObject(data) && !isFile(data) && !isDate(data)) {
    if (Object.keys(data).length === 0) {
      formData.append(formKey + "[]", "{}");
    }

    for (let property in data) {
      let tempFormKey = formKey + "[" + property + "]";

      if (!isString(data[property])) {
        if (
          isNull(data[property]) ||
          isNumber(data[property] || isBoolean([data[property]]))
        ) {
          formData.append(tempFormKey, data[property]);
        } else {
          toFormData(data[property], formData, tempFormKey);
        }
      } else {
        formData.append(tempFormKey, data[property]);
      }
    }
  } else if (isFile(data)) {
    formData.append(formKey, data);
  } else if (isDate(data)) {
    formData.append(formKey, data.toISOString());
  } else {
    formData.append(formKey, data);
  }

  return formData;
}
