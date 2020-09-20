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
  numberOfCards: number;
  nChildren: number;
  transition: boolean;
};

export interface OnResizePayload {
  width: number;
  nCards: number;
}

export type Action =
  | { type: "moveforward" }
  | { type: "movebackward" }
  | { type: "update"; payload: Partial<State> }
  | { type: "onResize"; payload: OnResizePayload };
