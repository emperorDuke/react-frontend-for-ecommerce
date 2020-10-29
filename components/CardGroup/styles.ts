import { Theme } from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";

interface StyleProps {
  position: number;
  cardWidth: number;
  transition: boolean;
}

export default makeStyles((theme: Theme) =>
  createStyles({
    cardImage: {
      width: (val: StyleProps) => val.cardWidth,
      height: (val: StyleProps) => val.cardWidth,
    },
    cardWrapper: {
      width: (val: StyleProps) => val.cardWidth,
      padding: theme.spacing(1, 0, 1, 1),
      transform: (val: StyleProps) => `translateX(${val.position}px)`,
      transition: (val: StyleProps) =>
        val.transition ? "transform 300ms ease-in-out" : "none",
    },
    btn: {
      position: "absolute",
      height: theme.spacing(6),
      width: theme.spacing(6),
      zIndex: 2,
    },
    leftBtn: {
      bottom: "50%",
      left: `calc(100% - ${theme.spacing(6)}px)`,
      borderRadius: `50% 0px 0px 50%`,
    },
    rightBtn: {
      bottom: "50%",
      borderRadius: `0px 50% 50% 0px`,
    },
  })
);
