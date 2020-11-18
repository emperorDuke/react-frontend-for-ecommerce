import React, { useEffect, useState, Children, useRef } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useSwipeable } from "react-swipeable";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import useStyles from "./styles";
import clsx from "classnames";
import { jumpforward as JF, jumpbackward as JB } from "../utils";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useDidUpdateEffect } from "../../../utils";
import { ThumbnailsProps } from "./@types";

const Thumbnails: React.ComponentType<ThumbnailsProps> = (props) => {
  const noOfVisibleThumbs = props.noOfVisibleThumbs || 4;
  const offsetX = props.thumbDimension.width;
  const offsetY = props.thumbDimension.height;
  const focusThumbs = !!props.focusThumbOnMount;

  const [value, setValue] = useState({
    activeIndex: props.activeIndex,
    focuserPosition: 0,
    thumbPosition: 0,
    transition: true,
  });

  const activeGroup = useRef(1);

  const groups = useRef([{ start: 0, end: 0 }]);

  const classes = useStyles({
    ...value,
    thumbWidth: offsetX,
    thumbHeight: offsetY,
    focusThumbs,
  });

  const handlers = useSwipeable({
    onSwipedRight: () => prevGroup(),
    onSwipedLeft: () => nextGroup(),
    trackMouse: true,
    trackTouch: true,
    preventDefaultTouchmoveEvent: true,
  });

  useEffect(() => {
    const nChildren = Children.count(props.children);

    let nGroups = 0;
    let i = 0;
    let j = i;
    let temp = [];

    if (nChildren % noOfVisibleThumbs > 0) {
      nGroups = Math.floor(nChildren / noOfVisibleThumbs) + 1;
    } else {
      nGroups = nChildren / noOfVisibleThumbs;
    }

    while (i < nGroups) {
      temp.push({
        start: j,
        end: j + noOfVisibleThumbs - 1,
      });
      j += noOfVisibleThumbs;
      i++;
    }

    groups.current = temp;
  }, []);

  useEffect(() => {
    const getGroupNumber = (idx: number) => {
      let index = groups.current.findIndex(
        (group) => idx >= group.start && idx <= group.end
      );
      return ++index;
    };

    const getFocuserPosition = (prev: typeof value) => {
      const nTime = Math.abs(props.activeIndex - prev.activeIndex);

      if (props.activeIndex === 0) {
        return 0;
      } else if (props.activeIndex > prev.activeIndex) {
        return JF(prev.focuserPosition, offsetX, nTime);
      } else if (props.activeIndex < prev.activeIndex) {
        return JB(prev.focuserPosition, offsetX, nTime);
      }

      return prev.focuserPosition;
    };

    const getThumbPosition = (thumbPosition: number) => {
      const currentGroup = getGroupNumber(props.activeIndex);
      const groupOffset = Math.abs(currentGroup - activeGroup.current);
      const nTime = noOfVisibleThumbs * groupOffset;

      if (activeGroup.current === currentGroup) {
        return thumbPosition;
      } else if (activeGroup.current > currentGroup) {
        activeGroup.current = currentGroup;
        return JF(thumbPosition, offsetX, nTime);
      } else if (activeGroup.current < currentGroup) {
        activeGroup.current = currentGroup;
        return JB(thumbPosition, offsetX, nTime);
      }

      return thumbPosition;
    };

    setValue((prev) => ({
      transition: true,
      activeIndex: props.activeIndex,
      thumbPosition: getThumbPosition(prev.thumbPosition),
      focuserPosition: getFocuserPosition(prev),
    }));
  }, [props.activeIndex]);

  useDidUpdateEffect(() => {
    const updateFocuserPosition = (activeIndex: number) => {
      return activeIndex === 0 ? 0 : JF(0, offsetX, activeIndex);
    };

    const updateThumbPosition = () => {
      let position = 0;

      if (activeGroup.current > 1) {
        const previousGroup = 1;
        const groupOffset = Math.abs(previousGroup - activeGroup.current);
        const nTime = noOfVisibleThumbs * groupOffset;
        position = JB(0, offsetX, nTime);
      }

      return position;
    };

    setValue((prev) => ({
      activeIndex: prev.activeIndex,
      transition: false,
      thumbPosition: updateThumbPosition(),
      focuserPosition: updateFocuserPosition(prev.activeIndex),
    }));
  }, [props.thumbDimension]);

  const nextGroup = () => {
    activeGroup.current += 1;

    setValue((prev) => ({
      transition: true,
      activeIndex: prev.activeIndex,
      focuserPosition: prev.focuserPosition,
      thumbPosition: JB(prev.thumbPosition, offsetX, noOfVisibleThumbs),
    }));
  };

  const prevGroup = () => {
    activeGroup.current -= 1;

    setValue((prev) => ({
      transition: true,
      activeIndex: prev.activeIndex,
      focuserPosition: prev.focuserPosition,
      thumbPosition: JF(prev.thumbPosition, offsetX, noOfVisibleThumbs),
    }));
  };

  const rightBtn = {
    [classes.disabledBtn]: activeGroup.current === groups.current.length,
    [classes.onHoverRightBtn]: props.standalone,
  };

  const leftBtn = {
    [classes.disabledBtn]: activeGroup.current === 1,
    [classes.onHoverLeftBtn]: props.standalone,
  };

  return (
    <div className={classes.thumbnailsWrapper}>
      <div className={classes.thumbnails} {...handlers}>
        {Children.map(props.children, (child, i) => (
          <ButtonBase className={classes.thumbWrapper} key={`child-${i}`}>
            <div
              className={clsx(classes.thumb, {
                [classes.notActiveThumb]: i !== props.activeIndex,
                [classes.activeThumb]:
                  i === props.activeIndex && focusThumbs && props.standalone,
              })}
            >
              {React.isValidElement(child) &&
                React.cloneElement(child, {
                  __parent: "thumbnailComponent",
                  __index: i,
                  __setIndex: props.setIndex,
                })}
            </div>
          </ButtonBase>
        ))}
        <div className={classes.focuser} />
      </div>
      <ButtonBase
        className={clsx(classes.btn, classes.leftBtn, leftBtn)}
        onClick={prevGroup}
      >
        <ChevronLeftIcon />
      </ButtonBase>
      <ButtonBase
        className={clsx(classes.btn, classes.rightBtn, rightBtn)}
        onClick={nextGroup}
      >
        <ChevronRightIcon />
      </ButtonBase>
    </div>
  );
};

Thumbnails.defaultProps = {
  noOfVisibleThumbs: 4,
};

export default Thumbnails;
