import { useState, useEffect } from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";

type Key = "xs" | "sm" | "md" | "lg" | "xl";

export function useWidth() {

  const [width, setWidth] = useState<Key>("lg");

  const theme = useTheme();

  const downMd = useMediaQuery(theme.breakpoints.down("md"));

  const downSm = useMediaQuery(theme.breakpoints.down("sm"));

  const downXs = useMediaQuery(theme.breakpoints.down("xs"));

  const downLg = useMediaQuery(theme.breakpoints.down("lg"));

  const downXl = useMediaQuery(theme.breakpoints.down("xl"));

  const getSizes = () => {
    if (downXs) {
      return "xs";
    } else if (downSm) {
      return "sm";
    } else if (downMd) {
      return "md";
    } else if (downLg) {
      return "lg";
    } else if (downXl) {
      return "xl";
    } else {
      return "lg";
    }
  };

  useEffect(() => {
    setWidth(getSizes());
  }, [getSizes()]);

  return width;
}
