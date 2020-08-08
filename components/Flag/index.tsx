import React from "react";
import createStyles from "@material-ui/core/styles/createStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyle, { WithStyles } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
  createStyles({
    flag: {
      backgroundColor: theme.palette.secondary.light,
      padding: theme.spacing(0, 1, 0, 1),
      color: theme.palette.secondary.contrastText,
    },
  });

export default withStyle(styles)(
  (props: WithStyles<typeof styles> & { flag?: string }) => (
    <Paper elevation={0} className={props.classes.flag}>
      <Typography variant="subtitle2">{props.flag}</Typography>
    </Paper>
  )
);
