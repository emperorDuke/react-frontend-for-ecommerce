import { ProductType } from "../../../redux/actionCreators/ProductActions";

export interface EnhancedProductType extends ProductType {
  link?: string;
  href?: string;
  as?: string;
  inCart?: boolean;
  price: number;
  discount: number;
  percentageOff?: string;
}

export type ProductEnhancerType = (
  products: Array<ProductType>,
  productsInCart: Array<number>
) => Array<EnhancedProductType>;

export type SortFnType<T = EnhancedProductType> = (
  cmpFn: (a: T, b: T) => number
) => void;

export type FnType<T = void> = (id: number) => T;
