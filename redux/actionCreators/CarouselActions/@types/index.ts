import {
  carouselRequest,
  carouselSuccess,
  carouselFailure
} from "../../CarouselActions";

export enum carousel {
  CAROUSEL_REQUEST = "CAROUSEL_REQUEST",
  CAROUSEL_SUCCESS = "CAROUSEL_SUCCESS",
  CAROUSEL_ERROR = "CAROUSEL_ERROR"
}

export interface CarouselType {
  id?: number;
  name: string;
  attachment: string;
  position: string;
  caption?: string;
  added_at: string;
}

export type CarouselActionTypes =
  | ReturnType<typeof carouselRequest>
  | ReturnType<typeof carouselSuccess>
  | ReturnType<typeof carouselFailure>;
