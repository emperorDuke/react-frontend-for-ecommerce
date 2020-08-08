import { ThumbnailsProps } from "./thumbnails/Thumbnail";

export interface State {
  dummyIndex: number;
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
  | { type: "moveforward"; payload: PayloadOne }
  | { type: "movebackward"; payload: PayloadOne }
  | { type: "reflowToFirst"; payload: PayloadTwo }
  | { type: "reflowToLast"; payload: PayloadTwo }
  | { type: "updateSize"; payload: UpdateSize };

export interface PayloadArgument {
  state: State;
  nChildren: number;
  infinite: boolean;
}

export interface SliderProps
  extends Pick<ThumbnailsProps, "noOfVisibleThumbs" | "focuserVisible"> {
  children?: React.ReactNodeArray;
  className?: string;
  interval?: number;
  showThumbs?: boolean;
  thumbHeightFactor?: number;
  disableIndicator?: boolean;
  disableButtons?: boolean;
  autoplay?: boolean;
  width?: number | string;
  height?: number | string;
  type?: "carousel" | "thumbnails";
  effectType?: EffectType;
  infinite?: boolean;
}
