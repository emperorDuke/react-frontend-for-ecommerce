import {
  carouselRequest,
  carouselSuccess,
  carouselFailure,
} from "../../CarouselActions";

export enum carousel {
  CAROUSEL_REQUEST = "CAROUSEL_REQUEST",
  CAROUSEL_SUCCESS = "CAROUSEL_SUCCESS",
  CAROUSEL_ERROR = "CAROUSEL_ERROR",
}

export type PositionType = "MAIN" | "CENTER" | "SIDE";

export interface CarouselType {
  id?: number;
  name: string;
  attachment: string;
  position: PositionType;
  caption?: string;
  added_at: string;
}

export type CarouselActionTypes =
  | ReturnType<typeof carouselRequest>
  | ReturnType<typeof carouselSuccess>
  | ReturnType<typeof carouselFailure>;
