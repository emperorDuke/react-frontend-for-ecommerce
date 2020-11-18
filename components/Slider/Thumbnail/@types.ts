import { Dimension } from "../@types";

export interface ThumbnailsProps {
  children?: React.ReactNodeArray;
  activeIndex: number;
  setIndex?: (i:number) => void;
  thumbDimension: Dimension;
  className?: string;
  noOfVisibleThumbs?: number;
  standalone?: boolean;
  /**
   * focus the thumb on the first mount
   */
  focusThumbOnMount?: boolean;
}
