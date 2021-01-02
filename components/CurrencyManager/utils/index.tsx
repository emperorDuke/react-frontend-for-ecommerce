import React from "react";
import { Currency } from "../@types";

export const currencySymbol = (currencyType?: Currency) => {
  const nairaIcon = <>&#8358;</>;
  
	switch (currencyType) {
		case Currency.NAIRA:
			return nairaIcon;
		default:
			return nairaIcon;
	}
};
