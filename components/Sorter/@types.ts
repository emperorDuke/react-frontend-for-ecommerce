import { EnhancedProductType } from "../../services";

export interface ProductFiltersType<T = EnhancedProductType> {
  key: number;
  cmpFn: (a: T, b: T) => number;
  type: string;
}
