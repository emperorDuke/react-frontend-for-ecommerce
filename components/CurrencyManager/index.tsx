import React from "react";
import { currencySymbol } from "./utils";
import { CurrencyManagerProps, Currency } from "./@types";

export * from "./@types";

const formatter = new Intl.NumberFormat("en-US");

const CurrencyManager: React.ComponentType<CurrencyManagerProps> = (props) => {
  return (
    <React.Fragment>
      {currencySymbol(props.currencyType)}
      {props.price && formatter.format(Number(props.price))}
    </React.Fragment>
  );
};

CurrencyManager.defaultProps = {
  currencyType: Currency.NAIRA,
};

export default CurrencyManager;
