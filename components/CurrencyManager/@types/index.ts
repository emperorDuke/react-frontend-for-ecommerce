import { IconProps } from "@material-ui/core/Icon";

export enum Currency {
  NAIRA = "NAIRA",
  DOLLAR = "DOLLAR"
}

export interface CurrencyManagerProps extends IconProps {
  price?: number | string;
  currencyType?: Currency;
}