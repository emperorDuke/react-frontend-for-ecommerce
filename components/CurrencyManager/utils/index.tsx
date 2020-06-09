import * as React from "react";
import { CurrencyTypes, CurrencyManagerProps } from "../@types";

export const sortCurrencySymbol = (currencyType: CurrencyManagerProps["currencyType"]) => {
  switch (currencyType) {
    case CurrencyTypes.NAIRA:
      return <>&#8358; </>;
    default:
      return <>&#8358; </>;;
  }
};
