import React, { useState, useEffect, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  updateCart,
  removeItem,
  loadCart,
  CartType,
} from "../../redux/actionCreators/CartActions";
import Cart from "../Cart";
import useSelector from "../../redux/utils/useStoreSelector";
import { CART_STORAGE_KEY } from "./utils";
import { useProduct } from "../../services";
import useStyles from "./styles";
import { useDidUpdate } from "../../utils";

export default function CartSection() {
  const isLoggedIn = useSelector(({ userAuth }) => userAuth.isLoggedIn);
  const cart = useSelector(({ cart }) => cart.cart);
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const { get } = useProduct();

  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => {
    let parsedCart: Array<CartType> = [];

    if (!isLoggedIn) {
      const localStorageCart = localStorage.getItem(CART_STORAGE_KEY);
      parsedCart = localStorageCart ? JSON.parse(localStorageCart) : null;
      if (parsedCart) dispatch(loadCart(parsedCart));
    }
  }, []);

  useDidUpdate(() => {
    setLocalCart(cart);
  }, [cart]);

  const handleDelete = useCallback((params: Pick<CartType, "index" | "id">) => {
    dispatch(removeItem(params));
  }, []);

  const handleQtyChange = useCallback((qty: number, index?: number) => {
    const item = localCart.find((cart) => cart.index === index);
    if (item) {
      const product = get(item.product);
      item["quantity"] = qty;
      if (product) {
        const price = product.discount || product.price;
        item["price"] = price * qty;
      }
      dispatch(updateCart(item));
    }
  }, [localCart]);

  return (
    <Container>
      <Grid container spacing={1} direction="column">
        <Grid item />
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Cart
                onChange={handleQtyChange}
                onDelete={handleDelete}
                items={localCart}
              />
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Grid container spacing={1} direction="column">
                  <Grid item xs={12}>
                    <Button
                      className={classes.btn}
                      onClick={() => router.push("/checkout")}
                      variant="contained"
                      color="secondary"
                    >
                      PROCEED TO CHECKOUT
                    </Button>
                  </Grid>
                  <Grid item sm={12}>
                    <Button
                      className={classes.btn}
                      onClick={() => router.push("/")}
                      variant="outlined"
                      color="secondary"
                    >
                      CONTINUE SHOPPING
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
