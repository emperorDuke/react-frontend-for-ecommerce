import { EnhancedProductType } from "../../../service/Product";

export interface ProductFiltersType<T = EnhancedProductType> {
  key: number;
  cmpFn: (a: T, b: T) => number;
  type: string;
}
