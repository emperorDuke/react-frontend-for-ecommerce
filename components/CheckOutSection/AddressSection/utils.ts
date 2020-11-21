import { ShippingDetailType } from "../../../redux/actionCreators/AddressActions";

/**
 * sort form fields
 */
export const formLabels = ({ minimal = false, excludeID = true }) => {
  const LABELS = ["first_name", "last_name", "address", "phone_number"];
  const EXTRALABELS = ["city", "state", "country"];

  let value = LABELS;

  if (!minimal) {
    value = LABELS.concat(EXTRALABELS);
  }

  if (!excludeID) {
    value = value.concat(["id"]);
  }

  return value;
};

/**
 * unflattens the shipping object
 * @param values object
 */
export function constructShippingData(values: any) {
  const addressObj: any = {};
  const shippingObj: any = {};
  const addressFields = ["address", "city", "state", "country"];

  const filterFunc = (key: string) => !addressFields.includes(key);

  addressFields.forEach((field) => {
    addressObj[field] = values[field];
  });

  Object.keys(values)
    .filter(filterFunc)
    .forEach((key) => {
      shippingObj[key] = values[key];
    });

  shippingObj["address"] = addressObj;

  return shippingObj as ShippingDetailType;
}
