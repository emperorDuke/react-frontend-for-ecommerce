
export interface IndicatorProps {
    children:React.ReactNodeArray;
    activeIndex: number;
    setIndex: (i:number) => void;
    sliderDimension: { width: number; height: number}
}