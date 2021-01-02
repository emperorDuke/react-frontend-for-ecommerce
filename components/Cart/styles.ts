import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { pink } from "@material-ui/core/colors";

export default makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		variantContainer: {
			display: "flex",
			flexDirection: "row",
			flexWrap: "nowrap",
		},
		image: {
			height: "100%",
			borderRadius: theme.shape.borderRadius,
			width: "100%",
		},
		wrapper: {
			display: "flex",
			borderRadius: theme.shape.borderRadius,
			justifyContent: "center",
			alignItems: "center",
			width: "100%",
			height: "5vh",
		},
		imageContainer: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			padding: theme.spacing(1),
			border: `1px solid ${pink[100]}`,
			borderRadius: theme.shape.borderRadius,
			transition: "border-color 300ms ease-in 30ms",
			width: "100%",
			"&:hover": {
				cursor: "pointer",
				borderColor: theme.palette.secondary.light,
			},
		},
		spacer: {
			flexGrow: 1,
		},
		font: {
			textTransform: "capitalize",
		},
		bottomSpacer: {
			flexGrow: 1,
		},
		bottomSpacer2: {
			flexBasis: "100px",
		},
		background: {
			backgroundColor: theme.palette.grey[200],
			color: theme.palette.common.black,
		},
		toolbarPadding: {
			padding: theme.spacing(1),
		},
		title: {
			display: "flex",
			width: "100%",
			flexWrap: "nowrap",
		},
	})
);
