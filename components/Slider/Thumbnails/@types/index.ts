
export interface ThumbnailsProps {
  children: React.ReactNodeArray;
  activeIndex: number;
  setIndex?: (i:number) => void;
  sliderDimension: { width: number; height: number };
  className?: string;
  heightFactor?: number;
  noThumbsPerView?: number;
  standalone?: boolean;
}
