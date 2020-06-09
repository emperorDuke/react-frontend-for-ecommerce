import { IconProps } from "@material-ui/core/Icon";

export enum CurrencyTypes {
  NAIRA = "NAIRA",
  DOLLAR = "DOLLAR"
}

type FontSizeTypes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface CurrencyManagerProps extends IconProps {
  price?: number;
  currencyType?: CurrencyTypes;
  customSize?: FontSizeTypes;
}

export interface CurrentManagerStyleProps {
  customSize: FontSizeTypes;
}
