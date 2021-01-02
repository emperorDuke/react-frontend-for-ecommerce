import React from "react";

export type SizeTypes = "md" | "sm" | "lg";

export interface CardEnhancerProps {
	size?: SizeTypes;
	disableToggler?: boolean;
	appBar?: boolean;
	appBarProps?: {
		text?: string;
		disableToggler?: boolean;
		link?: string;
	};
	children: React.ReactNodeArray;
	cardType?: "list" | "module";
}

export type State = {
	parentElWidth: number;
	position: number;
	activeIndex: number;
	transition: boolean;
};

export type Action =
	| {
			type: "moveforward";
			payload: {
				cardWidth: number;
				nChildren: number;
			};
	  }
	| {
			type: "movebackward";
			payload: {
				cardWidth: number;
				numberOfCards: number;
			};
	  }
	| { type: "update"; payload: Partial<State> }
	| {
			type: "onResize";
			payload: {
				numberOfCards: number;
				cardWidth: number;
				parentElWidth: number;
			};
	  };
