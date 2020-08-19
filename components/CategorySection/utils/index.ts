import { FilterKeyTypes } from "../../../redux/actionCreators/FilterActions/@types";
import { CategoryTypes } from "../../../redux/actionCreators/CategoryActions/@types";

const LOOKUPSEP = "__";
const GTE = "gte";
const LTE = "lte";

/**
 * refactor the filter data
 * @param filters the fetched filters
 */
export function transformFilter(filters?: FilterKeyTypes) {
  if (filters) {
    const newFilters: FilterKeyTypes = {};

    for (let filterKey in filters) {
      let attribute = filters[filterKey];

      let newAttr = attribute.map(({ key, value }) => ({
        key: key,
        value: value,
        checked: false,
      }));

      Object.defineProperty(newFilters, filterKey, {
        value: newAttr,
        enumerable: true,
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
    const subQ = newSubQuery.split("&").map((s) => {
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
export function getCategories(items?: CategoryTypes[], id?: string) {
  if (items) {
    let newItems: Array<{ name: string; id: string }> = [];

    for (let item of items) {
      for (let child of item.children) {
        if (child.id === id) {
          newItems.concat(
            [{ name: child.name, id: child.id }],
            child.children.map((grandChild) => ({
              name: grandChild.name,
              id: grandChild.id,
            }))
          );
          break;
        } else {
          for (let grandChild of child.children) {
            if (grandChild.id === id) {
              newItems.concat([
                {
                  name: grandChild.name,
                  id: grandChild.id,
                },
              ]);
              break;
            }
          }
        }
      }
      break;
    }
    return newItems;
  }
}
