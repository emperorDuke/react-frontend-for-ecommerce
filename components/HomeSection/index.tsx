import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CardEnhancer from "../CardEnhancer";
import StoreCard from "../CustomCards/StoreCards";
import NavBar from "../NavBar";
import useStyles from "./styles";
import { useProduct } from "../../service/Product";
import ModularCard from "../AppCards/ProductModularCard";
import Slider from "../Slider";
import Slide from "../Slider/Slide";
import Img from "../Img";
import { useMerchantStore } from "../../service/MerchantStore";
import useSelector from "../../redux/useStoreSelector";

const HomeSection: React.ComponentType = () => {
  const product = useProduct();
  const merchantStore = useMerchantStore();

  const categories = useSelector(({ categories }) => categories.categories);
  const carousels = useSelector(({ carousels }) => carousels.carousels);

  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Grid container spacing={1} direction="column">
        <Grid item />
        <Grid item>
          <Button variant="outlined">
            <MenuIcon />
            Categories
          </Button>
        </Grid>
        <Grid item container spacing={1} wrap="nowrap">
          <Grid item>
            <NavBar navItems={categories} />
          </Grid>
          <Grid item>
            <div className={classes.sliderDim}>
              <Slider autoplay showThumbs>
                {carousels.map(carousel => (
                  <Slide caption={carousel.caption} key={carousel.id}>
                    <Img src={carousel.attachment} alt={carousel.name} />
                  </Slide>
                ))}
              </Slider>
            </div>
          </Grid>
        </Grid>
        <Grid item>
          <Paper className={classes.cardMasterLayout}>
            <CardEnhancer
              withAppBar
              appBarProps={{ text: "Buy from the available stores", link: "/" }}
            >
              {merchantStore.all().map(store => (
                <StoreCard {...store} key={store.id} />
              ))}
            </CardEnhancer>
          </Paper>
        </Grid>
        <Grid item container direction="row" spacing={1}>
          <Grid item md={6}>
            <Img
              src={carousels[0].attachment}
              alt={carousels[0].name}
              className={classes.image}
            />
          </Grid>
          <Grid item md={6}>
            <Img
              src={carousels[1].attachment}
              alt={carousels[1].name}
              className={classes.image}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Paper className={classes.cardMasterLayout}>
            <Typography variant="h5" className={classes.t}>
              Top selling products
            </Typography>
            <CardEnhancer size="sm">
              {product.all().map(product => (
                <ModularCard {...product} key={product.id} />
              ))}
            </CardEnhancer>
          </Paper>
        </Grid>
        <Grid item />
      </Grid>
    </Container>
  );
};

export default HomeSection;
