import { CSSProperties } from "react";

export interface SlideProps {
  __parent?: "sliderComponent" | "thumbnailComponent";
  __setIndex?: (i: number) => void;
  __index?: number;
  className?: string;
  style?: CSSProperties;
  caption?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
}
