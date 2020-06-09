import React, { useState } from "react";
import Rating from "../../Rating";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import clsx from "classnames";
import InputWidget from "../../InputWidget";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCartOutlined";
import LocalShippingIcon from "@material-ui/icons/LocalShippingOutlined";
import CurrencyManager from "../../CurrencyManager";
import { addToCart } from "../../../redux/actionCreators/CartActions";
import Slide from "../../Slider/Slide";
import Slider from "../../Slider";
import Img from "../../Img";
import { VariationType } from "../../../redux/actionCreators/AttributeActions";
import useStyles from "./styles";
import { PropsType } from "./@types";

export default function ProductDetails(props: PropsType) {
  const [variants, setVariants] = useState<VariationType[]>([]);
  const [quantity, setQuantity] = useState(0);

  const router = useRouter();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleOptions = (action: "buyNow" | "addToCart") => {
    const price = props.product.discount || props.product.price;

    dispatch(
      addToCart({
        product: props.product.id as number,
        quantity: quantity,
        variants: variants,
        price: price * quantity
      })
    );

    if (action === "buyNow") router.push("/checkout-page");
  };

  const handleVariantChange = (arg: VariationType) => {
    const tempVariants = variants.slice();
    const i = tempVariants.findIndex(v => v.attribute === arg.attribute);

    if (i > -1) {
      tempVariants[i] = arg;
    } else {
      tempVariants.push(arg);
    }

    setVariants(tempVariants);
  };

  const attributesAndvariants = () =>
    props.attributes.map(attribute => (
      <Grid item key={attribute.id}>
        <Grid container alignItems="center">
          <Grid item md={2}>
            <label style={{ textTransform: "capitalize" }}>
              {attribute.name}:
            </label>
          </Grid>
          <Grid item> 
            <Slider type="thumbnails" width={300} height={200}>
              {attribute.variants.map(variant => (
                <Slide onClick={() => handleVariantChange(variant)}>
                  <Tooltip
                    title={
                      <p>
                        {variant.metric_verbose_name || variant.vendor_metric}
                      </p>
                    }
                    enterDelay={5}
                    enterTouchDelay={5}
                    leaveTouchDelay={20}
                    leaveDelay={20}
                    key={variant.id}
                  >
                    {variant.attachment ? (
                      <Img
                        src={variant.attachment}
                        alt={variant.vendor_metric}
                        className={classes.textWrapper}
                      />
                    ) : (
                      <div className={classes.textWrapper}>
                        <p className={classes.text}>{variant.vendor_metric}</p>
                      </div>
                    )}
                  </Tooltip>
                </Slide>
              ))}
            </Slider>
          </Grid>
        </Grid>
      </Grid>
    ));

  return (
    <div className={classes.container}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <div className={classes.paperLayer}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="h5">{props.product.name}</Typography>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={3}>
                      <Grid item>
                        <Rating
                          readonly
                          rating={props.product.rating.average_rating}
                        />
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item>
                            <label>Brand:</label>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1">
                              {props.product.brand}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Divider />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item>
                    {props.product.discount ? (
                      <Grid container spacing={3} alignItems="center">
                        <Grid item>
                          <Typography
                            variant="h5"
                            className={classes.priceText}
                          >
                            <CurrencyManager price={props.product.discount} />
                          </Typography>
                        </Grid>
                        <Grid item>
                          <s>
                            <Typography
                              variant="caption"
                              className={classes.pText}
                            >
                              <CurrencyManager price={props.product.price} />
                            </Typography>
                          </s>
                        </Grid>
                      </Grid>
                    ) : (
                      <Typography variant="h5" className={classes.pText}>
                        <CurrencyManager price={props.product.price} />
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item>
          <div className={clsx(classes.paperLayer, classes.greyBackground)}>
            <Grid container spacing={1} direction="column">
              {attributesAndvariants()}
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item md={2}>
                    <label>QUANTITY:</label>
                  </Grid>
                  <Grid item>
                    <InputWidget quantity={quantity} onChange={setQuantity} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item>
          <div className={classes.paperLayer}>
            <Grid container spacing={2}>
              <Grid item md={2} />
              <Grid item>
                <Button
                  className={classes.tooltip}
                  onClick={() => handleOptions("buyNow")}
                  variant="contained"
                  color="secondary"
                >
                  Buy It Now
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.tooltip}
                  onClick={() => handleOptions("addToCart")}
                  variant="contained"
                  color="secondary"
                >
                  <AddShoppingCartIcon className={classes.localShippinIcon} />
                  Add to cart
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Divider />
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item sm={3} xs>
                    <InputLabel>RETURN POLICY</InputLabel>
                  </Grid>
                  <Grid item sm={9} xs>
                    <Typography variant="h5" className={classes.pText}>
                      Return accepted if product is not as described, buuyer
                      pays return shipping fee or keep the product and agree
                      refun with the seller
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item sm={3}>
                    <InputLabel>SELLER GUARANTEES:</InputLabel>
                  </Grid>
                  <Grid item sm={9}>
                    <Grid container spacing={1}>
                      <Grid item>
                        <LocalShippingIcon />
                      </Grid>
                      <Grid item>
                        <Typography variant="h5" className={classes.pText}>
                          one-time delivery within two working days
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item sm={3}>
                    <InputLabel>STORE PROMOTIONS:</InputLabel>
                  </Grid>
                  <Grid item sm={9}>
                    <Typography variant="h5" className={classes.pText}>
                      when you buy twenty pieces you get a discount of 30%
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item sm={3}>
                    <InputLabel>PAYMENTS:</InputLabel>
                  </Grid>
                  <Grid item sm={9}>
                    <img src="/static/cards.png" alt="cards" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
