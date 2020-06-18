import React from "react";
import classNames from "classnames";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import InputWidget from "../InputWidget";
import Img from "../Img";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Link from "../Link";
import useStyles from "./styles";
import CurrencyManager from "../CurrencyManager";
import { CartProps } from "./@types";
import { sum } from "./utils";
import { useProduct, useMerchantStore } from "../../services";

export * from "./@types";
export * from "./utils";
export * from "./styles";

const Cart: React.ComponentType<CartProps> = props => {
  const classes = useStyles();
  const globalProduct = useProduct();
  const globalMerchantStore = useMerchantStore();

  const tableHeadItems = [
    { id: "img", label: "Item" },
    { id: "name", label: " " },
    { id: "variant", label: "Variants" },
    { id: "price", label: "Unit Price" },
    { id: "qty", label: "Quantity" },
    { id: "subtotal-price", label: "Sub Total" }
  ].map(({ id, label }) => (
    <TableCell key={id} className={classes.font}>
      {label}
    </TableCell>
  ));

  const tableBodyItems = props.items.map(item => {
    let tag: JSX.Element | undefined;

    const product = globalProduct.get(item.product);

    if (product) {
      const attributes = globalProduct.getAttributes(product.id);
      const merchantStore = globalMerchantStore.get(product.store);

      if (attributes) {
        tag = (
          <TableRow key={item.index}>
            <TableCell>
              <Link href={product.href} as={product.as}>
                <div className={classes.imageContainer}>
                  <Img
                    src={product.attachment_1}
                    alt={product.name}
                    className={classes.image}
                  />
                </div>
              </Link>
            </TableCell>
            <TableCell>
              <div className={classes.tableCell}>
                <Typography variant="subtitle1" gutterBottom>
                  Seller: {merchantStore && merchantStore.name}
                </Typography>
              </div>
              <div className={classes.tableCell}>
                <Typography
                  variant="body1"
                  gutterBottom
                  className={classes.font}
                >
                  {product.name}
                </Typography>
              </div>
              <div className={classes.tableCell}>
                <Typography variant="caption" gutterBottom>
                  This product is eligible for free shiping from Lagos within 3
                  working days
                </Typography>
              </div>
              <div className={classes.variantContainer}>
                <Button onClick={() => props.onDelete(item.index)}>
                  <DeleteIcon className={classes.marginRightIcon} />
                  Remove
                </Button>
                <Button>
                  <FavoriteIcon className={classes.marginRightIcon} />
                  Save for later
                </Button>
              </div>
            </TableCell>
            <TableCell>
              {item.variants.map(variant => {
                const attribute = attributes.find(
                  attribute => variant.attribute === attribute.id
                );
                return (
                  <div className={classes.variantContainer}>
                    <InputLabel
                      className={classNames(classes.font, classes.label)}
                    >
                      {attribute && attribute.name}:
                    </InputLabel>
                    {variant.attachment ? (
                      <div className={classes.thumbContainer}>
                        <Tooltip
                          title={
                            <p className={classes.font}>
                              {variant.metric_verbose_name ||
                                variant.vendor_metric}
                            </p>
                          }
                          enterDelay={5}
                          enterTouchDelay={5}
                          leaveTouchDelay={80}
                          leaveDelay={80}
                        >
                          <Link href={product.href} as={product.as}>
                            <Img
                              src={variant.attachment}
                              alt={variant.vendor_metric}
                              className={classes.image}
                            />
                          </Link>
                        </Tooltip>
                      </div>
                    ) : (
                      <div className={classes.textContainer}>
                        <Typography variant="h5">
                          {variant.vendor_metric}
                        </Typography>
                      </div>
                    )}
                  </div>
                );
              })}
            </TableCell>
            <TableCell className={classes.font}>
              <CurrencyManager price={product.discount || product.price} />
            </TableCell>
            <TableCell padding="none">
              <div className={classes.qtyContainer}>
                <InputWidget
                  index={item.index}
                  onChange={props.onChange}
                  quantity={item.quantity}
                />
              </div>
            </TableCell>
            <TableCell className={classes.font}>
              <CurrencyManager price={Number(item.price)} />
            </TableCell>
          </TableRow>
        );
      }
    }
    return tag;
  });

  return (
    <Paper elevation={2} className={classes.root}>
      <AppBar
        elevation={2}
        position="static"
        className={classNames(classes.background, classes.toolbarPadding)}
      >
        <Toolbar>
          <Typography variant="h2"> Cart </Typography>
          <div className={classes.spacer} />
          <Typography variant="h4">
            {props.items.length <= 1
              ? `${props.items.length} item`
              : `${props.items.length} items`}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.tableContainer}>
        <Table>
          <TableHead>{tableHeadItems}</TableHead>
          <TableBody>{tableBodyItems}</TableBody>
        </Table>
      </div>
      <Toolbar className={classes.toolbarPadding}>
        <Grid container spacing={1} direction="column">
          <Grid item>
            <Grid container spacing={2}>
              <div className={classes.bottomSpacer} />
              <Grid item>
                <Typography variant="h4">Total price:</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {tableBodyItems ? (
                    <CurrencyManager customSize={6} price={sum(props.items)} />
                  ) : (
                    <CurrencyManager />
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <div className={classes.bottomSpacer} />
            <Grid item>
              <Typography variant="h6">
                Shipping fee has not been included yet:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4">
                <CurrencyManager />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </Paper>
  );
};

export default Cart;
