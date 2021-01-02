import { ProductFiltersType } from "./@types";
 
export const sort = {
  ascending: (a: any, b: any) => {
    if (b > a) return -1;
    if (a > b) return 1;
    return 0;
  },
  descending: (a: any, b: any) => {
    if (b > a) return 1;
    if (a > b) return -1;
    return 0;
  }
};

export const sortParameters: Array<ProductFiltersType> = [
  {
    key: 1,
    type: "Price: Lowest - Highest",
    cmpFn: (a, b) => {
      const aa = Number(a["price"]);
      const bb = Number(b["price"]);
      return sort.descending(aa, bb);
    }
  },
  {
    key: 2,
    type: "Price: Highest - Lowest",
    cmpFn: (a, b) => {
      const aa = Number(a["price"]);
      const bb = Number(b["price"]);
      return sort.ascending(aa, bb);
    }
  },
  {
    key: 3,
    type: "Rating: Lowest - Highest",
    cmpFn: (a, b) => {
      const aa = Number(a["rating"].average_rating);
      const bb = Number(b["rating"].average_rating);
      return sort.descending(aa, bb);
    }
  },
  {
    key: 4,
    type: "Rating: Highest - Lowest",
    cmpFn: (a, b) => {
      const aa = Number(a["rating"].average_rating);
      const bb = Number(b["rating"].average_rating);
      return sort.ascending(aa, bb);
    }
  }
];
