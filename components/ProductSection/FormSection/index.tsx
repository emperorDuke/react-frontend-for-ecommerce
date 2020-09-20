import React, { useState } from "react";
import Rating from "../../Rating";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import clsx from "classnames";
import InputWidget from "../../InputWidget";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCartOutlined";
import CurrencyManager from "../../CurrencyManager";
import { addToCart } from "../../../redux/actionCreators/CartActions";
import { Slider, Slide } from "../../Slider";
import Img from "../../Img";
import { VariationType } from "../../../redux/actionCreators/AttributeActions";
import useStyles from "./styles";
import { PropsType } from "./@types";
import Flag from "../../Flag";
import Link from "../../Link";

export default function ProductDetails(props: PropsType) {
  const [variants, setVariants] = useState<VariationType[]>([]);
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleOptions = (action: "buyNow" | "addToCart") => () => {
    const price = props.product.discount || props.product.price;

    dispatch(
      addToCart({
        product: props.product.id as number,
        quantity: quantity,
        variants: variants,
        price: price * quantity,
      })
    );

    if (action === "buyNow") router.push("/checkout-page");
  };

  const getVariant = (id?: number) => {
    return variants.filter((v) => v.attribute === id);
  };

  const handleVariantChange = (param: VariationType) => () => {
    const tempVariants = variants.slice();
    const i = tempVariants.findIndex((v) => v.attribute === param.attribute);

    if (i > -1) {
      tempVariants[i] = param;
    } else {
      tempVariants.push(param);
    }

    setVariants(tempVariants);
  };

  const attributesAndvariants = () =>
    props.attributes.map((attribute) => (
      <Grid
        item
        container
        direction="column"
        spacing={1}
        xs={12}
        key={attribute.id}
      >
        <Grid item container alignItems="center" spacing={1}>
          <Grid item>
            <Typography variant="subtitle2" className={classes.capText}>
              {attribute.name}:
            </Typography>
          </Grid>
          <Grid item>
            {getVariant(attribute.id).map((v) => (
              <Typography
                variant="subtitle2"
                className={classes.capText}
                key={v.vendor_metric}
                color="secondary"
              >
                {v.metric_verbose_name || v.vendor_metric}
              </Typography>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Slider
            type="thumbnail"
            className={classes.thumnbnail}
            focusThumbs={!!getVariant(attribute.id).length}
          >
            {attribute.variants.map((variant) => (
              <Slide onClick={handleVariantChange(variant)} key={variant.id}>
                {variant.attachment ? (
                  <Img src={variant.attachment} alt={variant.vendor_metric} />
                ) : (
                  <div className={classes.textWrapper}>
                    <p className={classes.text}>{variant.vendor_metric}</p>
                  </div>
                )}
              </Slide>
            ))}
          </Slider>
        </Grid>
      </Grid>
    ));

  return (
    <div className={clsx(classes.flexGrow, classes.padding)}>
      <Grid container direction="column" spacing={1}>
        <Grid item xs={12}>
          <Grid container direction="column" spacing={1}>
            <Grid item container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h6">{props.product.name}</Typography>
              </Grid>
              {/** next level "availabilty and brand" */}
              <Grid item container alignItems="center" spacing={1}>
                <Grid item>
                  <Paper className={classes.green} elevation={0}>
                    <Typography variant="subtitle2">
                      {props.product.availability}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item>
                  <Typography variant="body1">|</Typography>
                </Grid>
                <Grid item container alignItems="center" spacing={1} xs>
                  <Grid item>
                    <Typography variant="subtitle2">Brand:</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">
                      {props.product.brand}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {/** next level rating and reviews */}
              <Grid item container spacing={1} alignItems="center">
                <Grid item>
                  <Rating
                    readonly
                    rating={props.product.rating.average_rating}
                  />
                </Grid>
                <Grid item>
                  <Link href="/">
                    <Typography variant="body2">(3000 reviews)</Typography>
                  </Link>
                </Grid>
              </Grid>
              <Grid item>
                <Divider />
              </Grid>
            </Grid>
            {/** prices */}
            <Grid item container alignItems="center" xs={12}>
              <Grid item container direction="column" xs={7}>
                <Grid item>
                  <Typography variant="h5">
                    <CurrencyManager
                      price={props.product.discount || props.product.price}
                    />
                  </Typography>
                </Grid>
                {props.product.discount && props.product.price && (
                  <Grid item container spacing={1}>
                    <Grid item>
                      <s>
                        <Typography variant="body2">
                          <CurrencyManager price={props.product.price} />
                        </Typography>
                      </s>
                    </Grid>
                    <Grid item>
                      <Flag flag={props.product.percentageOff} />
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <div className={classes.flexGrow} />
              <Grid item>
                <Typography variant="caption">
                  Want to sell ?{" "}
                  <Link href="/" color="secondary">
                    Start here
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.greyWrapper}>
            <Grid container spacing={1} direction="column">
              {attributesAndvariants()}
              <Grid item container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="subtitle2">Quantity:</Typography>
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={4}>
                    <InputWidget
                      quantity={quantity}
                      onChange={setQuantity}
                      height={25}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                onClick={handleOptions("addToCart")}
                variant="contained"
                color="primary"
                startIcon={<AddShoppingCartIcon />}
                className={classes.cartBtn}
              >
                Add to cart
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleOptions("buyNow")}
                variant="contained"
                color="primary"
              >
                Buy It Now
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
