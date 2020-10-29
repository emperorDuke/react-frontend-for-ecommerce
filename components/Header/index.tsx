import React, { useState, useEffect, useCallback } from "react";
import { HeaderProps } from "./@types";
import Logo from "../Logo/Logo";
import SearchBar from "./SearchBar";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import Popover from "@material-ui/core/Popover";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import FavoriteIcon from "@material-ui/icons/Favorite";
import useStyles from "./styles";
import NavBar from "../NavBar";
import { QueryTypes } from "./SearchBar/@types";
import useSelector from "../../redux/utils/useStoreSelector";
import { categoryRequest } from "../../redux/actionCreators/CategoryActions";
import { LocationRequest } from "../../redux/actionCreators/LocationActions";
import { useDispatch } from "react-redux";
import { Posting as Post } from "../../redux/actionCreators/PostActions";
import { loadCart } from "../../redux/actionCreators/CartActions";
import { CART_STORAGE_KEY } from "../CartSection/utils";
import { apiUrl as path, useUser } from "../../services";
import LoginForm from "../Loginsection/Login";
import UserRegSection from "../UserRegSection";
import { StyledButton } from "./customButton";
import { getCookie } from "../../cookie";
import { userRequest } from "../../redux/actionCreators/UserActions";
import { USERID } from "../../utils/cookieConstants";
import { useRouter } from "next/router";

const Header: React.ComponentType<HeaderProps> = (props) => {
  const cart = useSelector(({ cart }) => cart.cart);

  const buyer = useUser("buyer");

  const storeLocations = useSelector(({ locations }) => locations.locations);

  const categories = useSelector(({ categories }) => categories.categories);

  const isLoggedIn = useSelector(({ userAuth }) => userAuth.isLoggedIn);

  const dispatch = useDispatch();

  const router = useRouter();

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [anchorEl_2, setAnchorEl_2] = useState<HTMLElement | null>(null);

  const [queryStrings, setQueryStrings] = useState<QueryTypes>({
    location: "Region",
    category: "All Categories",
    query: "",
  });

  const [openLoginForm, setOpenLoginForm] = useState(false);

  const [openSignUpForm, setOpenSignUpForm] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      const localStorageCart = localStorage.getItem(CART_STORAGE_KEY);
      const parsedCart = localStorageCart && JSON.parse(localStorageCart);
      dispatch(loadCart(parsedCart));
    } else {
      const userId = getCookie(USERID);
      dispatch(userRequest(path("getBuyer", userId)));
    }

    dispatch(LocationRequest(path("getMerchantStoresLocations")));
    dispatch(categoryRequest(path("getCategories")));
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
    <AppBar position="static" className={classes.header} elevation={2}>
      <div className={classes.subHeaderWrapper_1}>
        <Container maxWidth="lg">
          <Grid container alignItems="center" spacing={1} wrap="nowrap">
            <Grid item xs={3}>
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
            <Grid item xs={2}>
              <StyledButton
                endIcon={<ArrowDropDownIcon />}
                onClick={(e) => setAnchorEl_2(e.currentTarget)}
                fullWidth
              >
                hi, {buyer.profile().first_name || "sign in | join"}
              </StyledButton>
              <Popover
                open={!!anchorEl_2}
                anchorEl={anchorEl_2}
                onClose={() => setAnchorEl_2(null)}
                anchorReference="anchorEl"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Paper className={classes.loginPaper}>
                  <Grid container spacing={1} direction="column">
                    <Grid item />
                    <Grid item xs={12}>
                      <div style={{ padding: "0px 8px" }}>
                        <Button
                          variant="contained"
                          fullWidth
                          color="primary"
                          onClick={() => setOpenLoginForm(true)}
                        >
                          Login
                        </Button>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "nowrap",
                        }}
                      >
                        <div className={classes.divider} />
                        <div className={classes.spacer} />
                        <Typography variant="body2" color="secondary">
                          New member ?
                        </Typography>
                        <div className={classes.spacer} />
                        <div className={classes.divider} />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ padding: "0px 8px" }}>
                        <Button
                          variant="outlined"
                          fullWidth
                          color="primary"
                          onClick={() => setOpenSignUpForm(true)}
                        >
                          create account
                        </Button>
                      </div>
                    </Grid>
                    <Grid item />
                  </Grid>
                </Paper>
              </Popover>
              <Dialog
                open={openLoginForm}
                aria-labelledby="dialog-for-login-form"
                fullWidth
              >
                <DialogTitle>Login</DialogTitle>
                <DialogActions>
                  <IconButton
                    onClick={() => setOpenLoginForm(false)}
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogActions>
                <DialogContent>
                  <LoginForm />
                </DialogContent>
              </Dialog>
              <Dialog
                open={openSignUpForm}
                aria-labelledby="dialog-for-signUp-form"
                fullWidth
              >
                <DialogTitle>Sign Up</DialogTitle>
                <DialogActions>
                  <IconButton onClick={() => setOpenSignUpForm(false)}>
                    <CloseIcon />
                  </IconButton>
                </DialogActions>
                <DialogContent>
                  <UserRegSection />
                </DialogContent>
              </Dialog>
            </Grid>
            <Grid item xs>
              <StyledButton startIcon={<FavoriteIcon />} fullWidth>
                wishlist
              </StyledButton>
            </Grid>
            <Grid item xs>
              <Badge
                badgeContent={cart ? cart.length : 0}
                color="secondary"
                classes={{ badge: classes.badge }}
              >
                <StyledButton
                  aria-label="Cart"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => router.push("/cart")}
                  fullWidth
                >
                  cart
                </StyledButton>
              </Badge>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={classes.subHeaderWrapper_2}>
        <Container maxWidth="lg">
          <Grid container alignItems="center" className={classes.pad}>
            <Grid item>
              <StyledButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                startIcon={<MenuIcon />}
                variant="outlined"
                disabled={props.disableCategoryButton}
              >
                Categories
              </StyledButton>
              {!props.disableCategoryButton && (
                <Popover
                  open={!!anchorEl}
                  anchorEl={anchorEl}
                  onClose={() => setAnchorEl(null)}
                  anchorReference="anchorEl"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <NavBar navItems={categories} />
                </Popover>
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
    </AppBar>
  );
};

Header.defaultProps = {
  disableSearch: false,
  disableCategoryButton: false,
};

export default Header;
