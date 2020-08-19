import React from "react";
import clsx from "classnames";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import EmptyStarIcon from "@material-ui/icons/StarBorder";
import styles from "./styles";
import { RatingProps, RatingStateTypes, RatingDefaultProps } from "./@types";

/**
 * Rating component
 */

const Rating: React.ComponentType<RatingProps> = withStyles(styles)(
  class Rating extends React.Component<
    RatingProps & WithStyles<typeof styles>,
    RatingStateTypes
  > {
    static defaultProps: Readonly<RatingDefaultProps> = {
      readonly: false,
    };

    constructor(props: RatingProps & WithStyles<typeof styles>) {
      super(props);
      this.state = {
        defaultRating: 0,
        tempRating: 0,
      };

      this.rate = this.rate.bind(this);
      this.starOut = this.starOut.bind(this);
      this.starOver = this.starOver.bind(this);
    }

    componentDidMount() {
      const { rating } = this.props;

      if (rating) {
        if (typeof rating === "string") {
          if (rating.indexOf(".") === -1) {
            this.setState({ defaultRating: parseInt(rating) });
          } else {
            this.setState({ defaultRating: parseFloat(rating) + 1 });
          }
        } else {
          this.setState({
            defaultRating: rating.toString().includes(".")
              ? rating + 1
              : rating,
          });
        }
      }
    }

    rate = (rating: number) => () => {
      this.setState({ defaultRating: rating, tempRating: rating });
    };

    starOver = (rating: number) => () => {
      this.setState((prev) => ({
        defaultRating: rating,
        tempRating: prev.defaultRating,
      }));
    };

    starOut = () => {
      this.setState((prev) => ({ defaultRating: prev.tempRating }));
    };

    sortStarType = (rating: number, idx: number) => {
      const { classes } = this.props;

      let el: JSX.Element;

      if (Math.floor(rating) >= idx) {
        if (rating % 1 >= 0.5 && Math.floor(rating) === idx) {
          el = <StarHalfIcon className={classes.font} />;
        } else {
          el = <StarIcon className={classes.font} />;
        }
      } else {
        el = <EmptyStarIcon className={classes.font} />;
      }

      return el;
    };

    render() {
      const { defaultRating } = this.state;
      const { classes, readonly, className } = this.props;

      let stars: Array<JSX.Element> = [];

      for (let i = 1; i <= 5; i++) {
        stars.push(
          <label
            key={i}
            className={clsx(classes.starRating, className, {
              [classes.isDisabled]: readonly,
              [classes.notSelected]: Math.floor(defaultRating) < i,
            })}
            onClick={!readonly ? this.rate(i) : undefined}
            onMouseOver={!readonly ? this.starOver(i) : undefined}
            onMouseOut={!readonly ? this.starOut : undefined}
          >
            {this.sortStarType(defaultRating, i)}
          </label>
        );
      }
      return <div>{stars}</div>;
    }
  }
);

export default Rating;
