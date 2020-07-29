import React, { useEffect, useState, Children, useRef } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import useStyles from "./styles";
import clsx from "classnames";
import { ThumbnailsProps } from "./@types";
import { jumpforward as JF, jumpbackward as JB } from "../utils";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useDidUpdate } from "../../../utils";

export * from "./@types";

function Thumbnails(props: ThumbnailsProps) {
  const noOfVisibleThumbs = props.noOfVisibleThumbs || 4;
  const offsetX = props.thumbDimension.width;
  const offsetY = props.thumbDimension.height;

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
  });

  useEffect(() => {
    const nChildren = Children.count(props.children);

    let nGroups = 0;
    let i = 0;
    let j = i;
    let temp = [];

    // the number of groups are determined depending on the
    // number of thumbs per view

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
    const getFocuserPosition = (prev: typeof value) => {
      const nTime = Math.abs(props.activeIndex - prev.activeIndex);

      if (props.activeIndex === 0) {
        return 0;
      } else if (props.activeIndex > prev.activeIndex) {
        return JF(prev.focuserPosition, offsetX, nTime);
      } else {
        return JB(prev.focuserPosition, offsetX, nTime);
      }
    };

    const getThumbPosition = (prev: typeof value) => {
      const currentGroup = getGroupNumber(props.activeIndex);
      const previousGroup = getGroupNumber(prev.activeIndex);
      const groupOffset = Math.abs(currentGroup - previousGroup);
      const isSameGroup = previousGroup === currentGroup;
      const nTime = noOfVisibleThumbs * groupOffset;

      if (activeGroup.current === currentGroup) {
        return prev.thumbPosition;
      } else if (props.activeIndex > prev.activeIndex && !isSameGroup) {
        activeGroup.current += groupOffset;
        return JB(prev.thumbPosition, offsetX, nTime);
      } else if (props.activeIndex < prev.activeIndex && !isSameGroup) {
        activeGroup.current -= groupOffset;
        return JF(prev.thumbPosition, offsetX, nTime);
      }

      return prev.thumbPosition;
    };

    setValue((prev) => ({
      transition: true,
      activeIndex: props.activeIndex,
      thumbPosition: getThumbPosition(prev),
      focuserPosition: getFocuserPosition(prev)
    }));
  }, [props.activeIndex]);

  useDidUpdate(() => {
    const updateFocuser = ({ activeIndex }: typeof value) => {
      return activeIndex === 0 ? 0 : JF(0, offsetX, activeIndex);
    };

    const updateThumb = ({ activeIndex }: typeof value) => {
      let position = 0;
      const currentGroup = getGroupNumber(activeIndex);

      if (currentGroup > 1) {
        const previousGroup = 1;
        const groupOffset = Math.abs(previousGroup - currentGroup);
        const nTime = noOfVisibleThumbs * groupOffset;
        position = JB(0, offsetX, nTime);
      }

      return position;
    };

    setValue((prev) => ({
      ...prev,
      transition: false,
      thumbPosition: updateThumb(prev),
      focuserPosition: updateFocuser(prev),
    }));
  }, [props.thumbDimension])

  const getGroupNumber = (idx: number) => {
    let index = groups.current.findIndex(
      (group) => idx >= group.start && idx <= group.end
    );
    return ++index;
  };

  const nextGroup = () => {
    activeGroup.current += 1;

    setValue((prev) => ({
      ...prev,
      transition: true,
      activeIndex: prev.activeIndex,
      focuserPosition: prev.focuserPosition,
      thumbPosition: JB(prev.thumbPosition, offsetX, noOfVisibleThumbs),
    }));
  };

  const prevGroup = () => {
    activeGroup.current -= 1;

    setValue((prev) => ({
      ...prev,
      transition: true,
      activeIndex: prev.activeIndex,
      focuserPosition: prev.focuserPosition,
      thumbPosition: JF(prev.thumbPosition, offsetX, noOfVisibleThumbs),
    }));
  };

  const hideRightButton = {
    [classes.disabledButton]: activeGroup.current === groups.current.length,
  };

  const hideLeftButton = {
    [classes.disabledButton]: activeGroup.current === 1,
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
  noOfVisibleThumbs: 4,
};

export default Thumbnails;
