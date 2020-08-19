import React from "react";
import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Grid from "@material-ui/core/Grid";
import ChevronRight from "@material-ui/icons/ChevronRight";
import InputLabel from "@material-ui/core/InputLabel";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import styles from "./styles";
import { EnhancedProductType } from "../../services";
import {
  SpecificationType,
  KeyFeatureType,
} from "../../redux/actionCreators/ProductMetaActions";
import Img from "../Img";

interface TabPanelProps {
  dir: string;
  children: React.ReactNode;
}

interface Props extends WithStyles<typeof styles> {
  theme: Theme;
  product: EnhancedProductType;
  specifications: Array<SpecificationType>;
  keyfeatures: Array<KeyFeatureType>;
}

function TabPanel({ children, dir }: TabPanelProps) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

class FullTabs extends React.Component<Props, { value: number }> {
  TABLABELS = ["product detail", "keyfeatures", "specifications", "reviews"];
  PRODUCTDETAILS = {
    text: "description_text",
    attachment_1: "description_attachament_1",
    attachment_2: "description_attachament_2",
  };

  constructor(props: Props) {
    super(props);
    this.state = { value: 0 };
  }

  handleChange = (e: React.ChangeEvent<{}>, value: number) => {
    this.setState({ value: value });
  };

  handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  };

  render() {
    const productDetails = (
      <Grid container direction="column">
        <Grid item>
          {Object.keys(this.props.product)
            .filter((key) => key === this.PRODUCTDETAILS.text)
            .map((key) => (
              <Typography variant="body1" key={this.props.product.id}>
                {this.props.product[key]}
              </Typography>
            ))}
        </Grid>
        {Object.keys(this.props.product)
          .filter(
            (key) =>
              key === this.PRODUCTDETAILS.attachment_1 ||
              key === this.PRODUCTDETAILS.attachment_2
          )
          .map((key, i) => (
            <Grid item key={`attachment_${i}`}>
              <Img
                src={this.props.product[key] as string}
                alt={this.props.product[key] as string}
              />
            </Grid>
          ))}
      </Grid>
    );

    const keyfeatures = (
      <Grid container>
        {this.props.specifications.map((spec) => (
          <Grid
            item
            container
            direction="row"
            key={spec.id}
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <InputLabel>{spec.type}:</InputLabel>
            </Grid>
            <Grid item>
              <Typography component="p">{spec.value}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    );

    const specifications = (
      <Grid container direction="column">
        {this.props.keyfeatures.map((feat) => (
          <Grid item key={feat.id}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <ChevronRight />
              <Typography component="p">{feat.feature}</Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    );

    return (
      <Paper className={this.props.classes.root}>
        <AppBar
          position="static"
          color="default"
          className={this.props.classes.root}
        >
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="primary"
            variant="standard"
          >
            {this.TABLABELS.map((label) => (
              <Tab
                label={label}
                key={label}
                className={this.props.classes.tabLabel}
              />
            ))}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={this.props.theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabPanel dir={this.props.theme.direction}>{productDetails}</TabPanel>
          <TabPanel dir={this.props.theme.direction}>{specifications}</TabPanel>
          <TabPanel dir={this.props.theme.direction}>{keyfeatures}</TabPanel>
        </SwipeableViews>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FullTabs);
