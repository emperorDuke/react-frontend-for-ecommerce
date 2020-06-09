
export interface SlideProps {
  __showCaption?: boolean;
  __setIndex?: (i:number) => void;
  __index?: number;
  className?: string;
  caption?: string;
  onClick?: (e:React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
  onTransitionEnd?: () => void;
  onAnimationEnd?: () => void;
}

export interface SlideHandles {
  next: (idx:number) => void;
}