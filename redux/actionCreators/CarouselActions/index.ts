import { carousel, CarouselType } from "./@types";

export * from "./@types";

export function carouselRequest(
  payload: string,
  type: typeof carousel.CAROUSEL_REQUEST = carousel.CAROUSEL_REQUEST
) {
  return {
    type: type,
    payload
  };
}

export function carouselSuccess(
  payload: Array<CarouselType>,
  type: typeof carousel.CAROUSEL_SUCCESS = carousel.CAROUSEL_SUCCESS
) {
  return {
    type: type,
    payload: payload
  };
}

export function carouselFailure(
  payload: string,
  type: typeof carousel.CAROUSEL_ERROR = carousel.CAROUSEL_ERROR
) {
  return {
    type: type,
    payload: payload
  };
}
