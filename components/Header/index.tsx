import React, { useState, useEffect, useCallback } from "react";
import Link from "../Link";
import { HeaderProps } from "./@types";
import classNames from "classnames";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import PersonIcon from "@material-ui/icons/PersonOutline";
import Popover from "@material-ui/core/Popover";
import useStyles from "./styles";
import NavBar from "../NavBar";
import { QueryTypes } from "../SearchBar/@types";
import useStoreSelector from "../../redux/utils/useStoreSelector";
import { categoryRequest } from "../../redux/actionCreators/CategoryActions";
import { LocationRequest } from "../../redux/actionCreators/LocationActions";
import { useDispatch } from "react-redux";
import { Posting as Post } from "../../redux/actionCreators/PostActions";
import LoginForm from "../Loginsection";
import { CartType, loadCart } from "../../redux/actionCreators/CartActions";
import { CART_STORAGE_KEY } from "../CartSection/utils";
import { apiUrl }from "../../services";

const Header: React.ComponentType<HeaderProps> = (props) => {
  const cart = useStoreSelector(({ cart }) => cart.cart);

  const storeLocations = useStoreSelector(
    ({ locations }) => locations.locations
  );

  const categories = useStoreSelector(
    ({ categories }) => categories.categories
  );

  const isLoggedIn = useStoreSelector(({ userAuth }) => userAuth.isLoggedIn);

  const dispatch = useDispatch();

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [queryStrings, setQueryStrings] = useState<QueryTypes>({
    location: "Region",
    category: "All Categories",
    query: "",
  });

  useEffect(() => {
    let parsedCart: Array<CartType>;

    if (!isLoggedIn && typeof localStorage !== "undefined") {
      const localStorageCart = localStorage.getItem(CART_STORAGE_KEY);
      parsedCart = localStorageCart && JSON.parse(localStorageCart);
    } else {
      parsedCart = cart;
    }

    dispatch(loadCart(parsedCart));
    dispatch(LocationRequest(apiUrl("getMerchantStoresLocations")));
    dispatch(categoryRequest(apiUrl("getCategories")));
  }, []);

  const postSearchQuery = useCallback(() => {
    const { location, category, query } = queryStrings;

    dispatch(
      Post({
        url: `/?search=${query}&?location=${location}&?category=${category}`,
      })
    );
  }, [queryStrings, dispatch]);

  return (
    <header>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item>
            <Button>hi, sign in / register</Button>
          </Grid>
          <div style={{ flexGrow: 1 }} />
          <Grid item>
            <Button>my account</Button>
          </Grid>
          <Grid item>
            <Button>help ?</Button>
          </Grid>
        </Grid>
      </Container>
      <Paper elevation={0} className={classes.subHeader_2}>
        <AppBar position="static" className={classes.appBar} elevation={2}>
          <Toolbar>
            <Container maxWidth="lg">
              <Grid container alignItems="center">
                <Grid item className={classes.image}>
                  <Logo />
                </Grid>
                <Grid item>
                  {!props.disableSearch && (
                    <SearchBar
                      locations={storeLocations}
                      categories={categories}
                      postSearch={postSearchQuery}
                      queries={queryStrings}
                      onChange={setQueryStrings}
                    />
                  )}
                </Grid>
                <div style={{ flexGrow: 1 }} />
                <Grid item>
                  <Button startIcon={<PersonIcon />}>
                    hi, sign in | join{" "}
                  </Button>
                </Grid>
                <Grid item>
                  <Button aria-label="Cart">
                    <Link href="/cart" color="inherit">
                      <Badge
                        badgeContent={cart.length}
                        color="secondary"
                        classes={{ badge: classes.badge }}
                      >
                        <ShoppingCartIcon className={classes.cartBtn} />
                      </Badge>
                      cart
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Toolbar>
        </AppBar>
        {/* <Container fixed>
          <Grid container>
            <Grid item>
              <Button
                onClick={
                  !props.disableCategoryButton
                    ? e => setAnchorEl(e.currentTarget)
                    : undefined
                }
                className={classNames(classes.font)}
                variant={props.disableCategoryButton ? "outlined" : "text"}
              >
                <MenuIcon className={classes.menuIcon} />
                Categories
              </Button>
              {!props.disableCategoryButton && (
                <Popover
                  open={!!anchorEl}
                  onClose={() => setAnchorEl(null)}
                  anchorReference="anchorPosition"
                  anchorPosition={{
                    top: 190,
                    left: 66
                  }}
                >
                  <NavBar navItems={categories} />
                </Popover>
              )}
            </Grid>
          </Grid> 
        </Container>*/}
      </Paper>
    </header>
  );
};

Header.defaultProps = {
  disableSearch: false,
  disableCategoryButton: false,
};

export default Header;
