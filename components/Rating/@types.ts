




/**
 * initial value use to set the rating
 */
export interface RatingProps {
    readonly?: boolean;
    rating?: number | string;
    className?: string;
}

export type RatingStateTypes = {
    defaultRating: number;
    tempRating: number;
}

/**
 * if true the rating wll be in write mode
 */
export type RatingDefaultProps = {
    readonly: boolean
}