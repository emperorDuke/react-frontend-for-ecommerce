import { Dimension } from "../types";

export interface IndicatorProps {
    children:React.ReactNodeArray;
    activeIndex: number;
    setIndex: (i:number) => void;
    dotDimension: Dimension;
}