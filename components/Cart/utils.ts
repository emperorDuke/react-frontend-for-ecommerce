import { CartProps } from "./@types";

export function sum(items: CartProps["items"]) {
  let total = 0;

  if (items.length > 0) {
    for (let item of items) {
      total += Number(item.price);
    }
  }
  return total;
}
