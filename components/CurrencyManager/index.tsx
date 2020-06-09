import React, { useMemo } from "react";
import { sortCurrencySymbol } from "./utils";
import { CurrencyManagerProps, CurrencyTypes } from "./@types";
import useStyles from "./styles";

export * from "./@types";

const CurrencyManager: React.ComponentType<CurrencyManagerProps> = props => {
  const currencySymbol = useMemo(() => sortCurrencySymbol(props.currencyType), [
    props.currencyType
  ]);

  return (
    <>
      {currencySymbol}
      {props.price && new Intl.NumberFormat("en-US").format(props.price)}
    </>
  );
};

CurrencyManager.defaultProps = {
  customSize: 0,
  currencyType: CurrencyTypes.NAIRA
};

export default CurrencyManager;
