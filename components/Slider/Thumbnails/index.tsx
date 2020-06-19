import React, { useEffect, useState, Children, useRef } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import useStyles from "./styles";
import clsx from "classnames";
import { ThumbnailsProps } from "./@types";
import { jumpforward, jumpbackward } from "../utils";
import ButtonBase from "@material-ui/core/ButtonBase";

export * from "./@types";

function Thumbnails(props: ThumbnailsProps) {
  const noThumbsPerView = props.noThumbsPerView ?? 4;
  const offsetX = props.sliderDimension.width / noThumbsPerView;

  let offsetY = 0;

  if (props.heightFactor) {
    offsetY = props.sliderDimension.height / props.heightFactor;
  } else if (props.standalone) {
    offsetY = props.sliderDimension.height;
  }

  const [value, setValue] = useState({
    activeIndex: props.activeIndex,
    focuserPosition: 0,
    thumbPosition: 0
  });

  const activeGroup = useRef(1);

  const groups = useRef([{ start: 0, end: 0 }]);

  const classes = useStyles({
    ...value,
    thumbWidth: offsetX,
    thumbHeight: offsetY
  });

  useEffect(() => {
    const nChildren = Children.count(props.children);

    let nGroups = 0;
    let i = 0;
    let j = i;
    let temp = [];

    // the number of groups are determined depending on the
    // number of thumbs per view

    if (nChildren % noThumbsPerView > 0) {
      nGroups = Math.floor(nChildren / noThumbsPerView) + 1;
    } else {
      nGroups = nChildren / noThumbsPerView;
    }

    while (i < nGroups) {
      temp.push({
        start: j,
        end: j + noThumbsPerView - 1
      });
      j += noThumbsPerView;
      i++;
    }

    groups.current = temp;
  }, []);

  useEffect(() => {
    const getFocuserPosition = (prev: typeof value) => {
      const nTime = Math.abs(props.activeIndex - prev.activeIndex);

      if (props.activeIndex === 0) {
        return 0;
      } else if (props.activeIndex > prev.activeIndex) {
        return jumpforward(prev.focuserPosition, offsetX, nTime);
      } else {
        return jumpbackward(prev.focuserPosition, offsetX, nTime);
      }
    };

    const getGroupNumber = (idx: number) => {
      let index = groups.current.findIndex(
        group => idx >= group.start && idx <= group.end
      );
      return ++index;
    };

    const getThumbPosition = (prev: typeof value) => {
      const currentGroup = getGroupNumber(props.activeIndex);
      const previousGroup = getGroupNumber(prev.activeIndex);
      const groupOffset = Math.abs(currentGroup - previousGroup);
      const isSameGroup = previousGroup === currentGroup;
      const nTime = noThumbsPerView * groupOffset;

      if (activeGroup.current === currentGroup) {
        return prev.thumbPosition;
      } else if (props.activeIndex > prev.activeIndex && !isSameGroup) {
        activeGroup.current += groupOffset;
        return jumpbackward(prev.thumbPosition, offsetX, nTime);
      } else if (props.activeIndex < prev.activeIndex && !isSameGroup) {
        activeGroup.current -= groupOffset;
        return jumpforward(prev.thumbPosition, offsetX, nTime);
      }

      return prev.thumbPosition;
    };

    setValue(prev => ({
      activeIndex: props.activeIndex,
      thumbPosition: getThumbPosition(prev),
      focuserPosition: getFocuserPosition(prev)
    }));
  }, [props.activeIndex]);

  const nextGroup = () => {
    activeGroup.current += 1;

    setValue(prev => ({
      activeIndex: prev.activeIndex,
      focuserPosition: prev.focuserPosition,
      thumbPosition: jumpbackward(prev.thumbPosition, offsetX, noThumbsPerView)
    }));
  };

  const prevGroup = () => {
    activeGroup.current -= 1;

    setValue(prev => ({
      activeIndex: prev.activeIndex,
      focuserPosition: prev.focuserPosition,
      thumbPosition: jumpforward(prev.thumbPosition, offsetX, noThumbsPerView)
    }));
  };

  const hideRightButton = {
    [classes.disabledButton]: activeGroup.current === groups.current.length
  };

  const hideLeftButton = {
    [classes.disabledButton]: activeGroup.current === 1
  };

  return (
    <div className={classes.thumbnailsWrapper}>
      <div className={classes.thumbnails}>
        <div className={classes.thumbsWrapper}>
          {Children.map(props.children, (child, i) => (
            <ButtonBase>
              <div className={classes.thumbWrapperContainer}>
                <div key={`child${i}`} className={classes.thumbWrapper}>
                  {React.isValidElement(child) &&
                    React.cloneElement(child, {
                      __showCaption: false,
                      __index: i,
                      __setIndex: props.setIndex,
                      __isThumbnails: props.standalone
                    })}
                </div>
              </div>
            </ButtonBase>
          ))}
        </div>
        <div className={classes.focuser} />
      </div>
      <ButtonBase
        className={clsx(classes.button, classes.leftButton, hideLeftButton)}
        onClick={prevGroup}
      >
        <ChevronLeftIcon />
      </ButtonBase>
      <ButtonBase
        className={clsx(classes.button, classes.rightButton, hideRightButton)}
        onClick={nextGroup}
      >
        <ChevronRightIcon />
      </ButtonBase>
    </div>
  );
}

Thumbnails.defaultProps = {
  heightFactor: 6,
  noThumbsPerView: 4,
  standalone: false
};

export default Thumbnails;
