
export interface SlideProps {
  __showCaption?: boolean;
  __setIndex?: (i:number) => void;
  __index?: number;
  __isThumbnails?: boolean;
  className?: string;
  caption?: string;
  onClick?: (e:React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
  onTransitionEnd?: () => void;
  onAnimationEnd?: () => void;
}