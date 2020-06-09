import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardAction from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Img from "../../Img";
import Link from "../../Link";
import CurrencyManager from "../../CurrencyManager";
import Rating from "../../Rating";
import { EnhancedProductType } from "../../../service/Product";
import { AppCardProps } from "../@types";
import useStyles from "../styles";
import useTheme from "@material-ui/core/styles/useTheme";

type PropsType = EnhancedProductType & AppCardProps;

const getClass = (classes: AppCardProps["classes"], key: "img") =>
  classes ? classes[key] : undefined;

const ModularCard: React.ComponentType<PropsType> = product => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card>
      <Link href={product.href} as={product.as} className={classes.linkClass}>
        <CardActionArea>
          <CardAction>
            <Paper elevation={0} className={classes.flag}>
              <Typography variant="subtitle1">
                {product.percentageOff}
              </Typography>
            </Paper>
          </CardAction>
          <Img
            src={product.attachment_1}
            alt={product.name}
            className={getClass(product.classes, "img")}
          />
          <div style={{ padding: theme.spacing(2) }}>
            <Typography variant="caption" className={classes.text}>
              {product.brand}
            </Typography>
          </div>
          <Divider />
          <CardContent>
            <Typography variant="subtitle1" noWrap className={classes.text}>
              {product.name}
            </Typography>
            <Grid container>
              <Grid item>
                {product.discount ? (
                  <Grid
                    container
                    direction={product.size === "sm" ? "row" : "column"}
                    spacing={product.size === "sm" ? 1 : 0}
                  >
                    <Grid item>
                      <Typography variant="subtitle1">
                        <CurrencyManager
                          price={product.discount}
                          customSize={2}
                        />
                      </Typography>
                    </Grid>
                    <Grid item>
                      <div
                        style={{
                          paddingTop: product.size === "sm" ? "3px" : "0px"
                        }}
                      >
                        <Typography variant="caption">
                          <s>
                            <CurrencyManager price={product.price} />
                          </s>
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                ) : (
                  <React.Fragment>
                    <Typography variant="subtitle1">
                      <CurrencyManager price={product.price} />
                    </Typography>
                  </React.Fragment>
                )}
              </Grid>
              <div style={{ flexGrow: 1 }} />
              {product.size !== "sm" && (
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Rating readonly rating={product.rating.average_rating} />
                    </Grid>
                    <Grid item>
                      <div style={{ paddingLeft: "10px" }}>
                        <Typography variant="caption">(24 reviews)</Typography>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

ModularCard.defaultProps = {
  size: "md"
};

export default ModularCard;
