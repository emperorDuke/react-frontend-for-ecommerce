import { FilterKeyTypes } from "../../../redux/actionCreators/FilterActions/@types";
import { CategoryTypes } from "../../../redux/actionCreators/CategoryActions/@types";
import { useEffect } from "react";
import { useRef } from "react";

const LOOKUPSEP = "__";
const GTE = "gte";
const LTE = "lte";

/**
 * refactor the filter data
 * @param filters the fetched filters
 */
export function transformFilter(filters: FilterKeyTypes | undefined) {
  if (filters) {
    const newFilters: FilterKeyTypes = Object.create(Object.prototype);

    for (let filterKey in filters) {
      let attribute = filters[filterKey];

      let newAttr = attribute.map(({ key, value }) => ({
        key: key,
        value: value,
        checked: false
      }));

      Object.defineProperty(newFilters, filterKey, {
        value: newAttr,
        enumerable: true
      });
    }
    return newFilters;
  }
}

/**
 * insert or replace a subquery in query string
 * @param query url filter query
 * @param newSubQuery lookup to be queried
 */
export function insertOrEditQuery(prevQuery: string, newSubQuery: string) {
  const re = RegExp(
    `^[\\D_]+${LOOKUPSEP}(?:${GTE}|${LTE})=[\\w]+&[\\D_]+${LOOKUPSEP}(?:${GTE}|${LTE})=[\\w]+$`,
    "i"
  );

  // it test if the subQueries are two //

  let qsRe = /()/;

  if (re.test(newSubQuery)) {
    const subQ = newSubQuery.split("&").map(s => {
      let sub = s.split("=")[0].split(LOOKUPSEP);
      return `${sub[0]}${LOOKUPSEP}(?:${GTE}|${LTE})=[\\w]+`;
    });
    qsRe = RegExp(`${subQ.join("&")}(?=(?:&|$))`, "i");
  } else {
    const subQ = newSubQuery.split("=")[0].split(LOOKUPSEP);
    qsRe = RegExp(`${subQ[0]}${LOOKUPSEP}${subQ[1]}=[\\w]+(?=(?:&|$))`, "i");
  }

  return qsRe.test(prevQuery)
    ? prevQuery.replace(qsRe, newSubQuery)
    : `${prevQuery}&${newSubQuery}`;
}

/**
 * get sub categories and related categories
 * @param items fetched categories
 * @param id category track id
 */
export function getCategories(
  items: Array<CategoryTypes> | undefined,
  id?: string
) {
  if (items) {
    let newItems: Array<{ name: string; track_id: string }> = [];

    for (let j = 0; j < items.length; j++) {
      let itemsChildren = items[j].children;

      for (let k = 0; k < itemsChildren.length; k++) {
        let child = itemsChildren[k];

        if (child.track_id === id) {
          newItems.concat(
            [{ name: child.name, track_id: child.track_id }],
            child.children.map(grandChild => ({
              name: grandChild.name,
              track_id: grandChild.track_id
            }))
          );
          break;
        } else {
          for (let i = 0; i < child.children.length; i++) {
            if (child.children[i].track_id === id) {
              newItems.concat([
                {
                  name: child.children[i].name,
                  track_id: child.children[i].track_id
                }
              ]);
              break;
            }
          }
        }
      }
      break;
    }
    return newItems;
  } else {
    return undefined;
  }
}

/**
 * hook will run after every re-render except for the initial render
 * @param callback effect callback
 * @param deps effect dependencies
 */
export const useDidUpdate = (callback: () => any, deps?: readonly any[]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) callback();
    else didMount.current = true;
  }, deps);
};
