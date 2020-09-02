import { ThumbnailsProps } from "./Thumbnail";

export interface State {
  slideNo: number;
  position: number;
  transition: boolean;
  activeIndex: number;
  width: number;
  height: number;
}

export type EffectType = "fade" | "slide";

export interface PayloadOne {
  nextIndex: number;
}

export interface PayloadTwo {
  nChildren: number;
}

export interface Dimension {
  width: number;
  height: number;
}

export interface UpdateSize extends Dimension {
}

export type Action =
  | { type: "moveTo"; payload: State }
  | { type: "jumpforward"; payload: PayloadOne }
  | { type: "jumpbackward"; payload: PayloadOne }
  | { type: "reflowToFirst"; payload: PayloadTwo }
  | { type: "reflowToLast"; payload: PayloadTwo }
  | { type: "updateSize"; payload: UpdateSize };

export interface PayloadArgument {
  state: State;
  nChildren: number;
  infinite: boolean;
}

export interface SliderProps
  extends Pick<ThumbnailsProps, "noOfVisibleThumbs" | "focusThumbs"> {
  children?: React.ReactNodeArray;
  /**
   * Css class
   */
  className?: string;
  /**
   * time in ms before slide change
   */
  interval?: number;
  /**
   * Show thumnnails
   */
  showThumbs?: boolean;
  /**
   * The factor number of how small the thumb height is in relative to the 
   * height of slider
   */
  thumbHeightFactor?: number;
  disableIndicator?: boolean;
  disableButtons?: boolean;
  autoplay?: boolean;
  /**
   * Width of the slider
   */
  width?: number | string;
  /**
   * Height of the slider
   */
  height?: number | string;
  type?: "carousel" | "thumbnail";
  effectType?: EffectType;
  infinite?: boolean;
  pauseOnMouseEnter?: boolean;
  timeout?: number;
}
