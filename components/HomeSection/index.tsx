import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CardEnhancer from "../CardEnhancer";
import NavBar from "../NavBar";
import useStyles from "./styles";
import ModularCard from "../AppCards/ProductModularCard";
import Slider from "../Slider";
import Slide from "../Slider/Slide";
import Img from "../Img";
import useSelector from "../../redux/utils/useStoreSelector";
import { useListings, useAds } from "../../services";

const HomeSection: React.ComponentType = () => {
  const ads = useAds();
  const listings = useListings();
  const categories = useSelector(({ categories }) => categories.categories);
  const classes = useStyles();
  const centerAds = ads.getAdBlock("CENTER");
  const mainAds = ads.getAdBlock("MAIN");

  const sponsoredStores = ads.getSponsoredItems().shops.map((shop) => (
    <Grid item>
      <Paper className={classes.cardMasterLayout}>
        <CardEnhancer appBar appBarProps={{ text: shop.store.name, link: "/" }}>
          {shop.products.map((product) => (
            <ModularCard {...product} key={product.id} />
          ))}
        </CardEnhancer>
      </Paper>
    </Grid>
  ));

  const getMappedAds = () => {
    let mappedAds = [];
    let i = 0;

    while (i < centerAds.length) {
      let nextIndex = i + 1;

      if (nextIndex === centerAds.length) {
        mappedAds.push(
          <Grid item container direction="row" spacing={1}>
            <Grid item md={6}>
              <Img
                src={centerAds[i].attachment}
                alt={centerAds[i].name}
                className={classes.image}
              />
            </Grid>
          </Grid>
        );
      } else {
        mappedAds.push(
          <Grid item container direction="row" spacing={1}>
            <Grid item md={6}>
              <Img
                src={centerAds[i].attachment}
                alt={centerAds[i].name}
                className={classes.image}
              />
            </Grid>
            <Grid item md={6}>
              <Img
                src={centerAds[nextIndex].attachment}
                alt={centerAds[nextIndex].name}
                className={classes.image}
              />
            </Grid>
          </Grid>
        );
      }
      i += 2;
    }

    return mappedAds;
  };

  const sponsoredProducts = (
    <Grid item>
      <Paper className={classes.cardMasterLayout}>
        <CardEnhancer
          appBar
          appBarProps={{ text: "Sponsored products", link: "/" }}
        >
          {ads.getSponsoredItems().products.map((product) => (
            <ModularCard {...product} key={product.id} />
          ))}
        </CardEnhancer>
      </Paper>
    </Grid>
  );

  const listedProducts = listings.all().flatMap((listing) =>
    Object.keys(listing).map((key) => (
      <Grid item>
        <Paper className={classes.cardMasterLayout}>
          <Typography variant="h5" className={classes.t}>
            {key}
          </Typography>
          <CardEnhancer>
            {listing[key].map((product) => (
              <ModularCard {...product} key={product.id} />
            ))}
          </CardEnhancer>
        </Paper>
      </Grid>
    ))
  );

  const joggler = () => {
    const joggledComponents = [];
    const internalAds = getMappedAds();
    const range = Math.max(
      internalAds.length,
      sponsoredStores.length,
      listedProducts.length
    );

    for (let i = 0; i < range; i++) {
      if (i < internalAds.length) {
        joggledComponents.push(internalAds[i]);
      }

      if (i === 0) {
        joggledComponents.push(sponsoredProducts);
      }

      if (i < sponsoredStores.length) {
        joggledComponents.push(sponsoredStores[i]);
      }

      if (i === sponsoredStores.length) {
        joggledComponents.push(listedProducts[i]);
      }
    }

    return joggledComponents;
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={1} direction="column">
        {/* ///////////// spacer //////////////////// */}
        <Grid item />
        {/* ///////////// spacer //////////////////// */}

        <Grid item>
          <Button variant="outlined" startIcon={<MenuIcon />}>
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
                {mainAds.map((ad) => (
                  <Slide caption={ad.caption} key={ad.id}>
                    <Img src={ad.attachment} alt={ad.name} />
                  </Slide>
                ))}
              </Slider>
            </div>
          </Grid>
        </Grid>
        {joggler()}

        {/* ///////////// spacer //////////////////// */}
        <Grid item />
        {/* ///////////// spacer //////////////////// */}
      </Grid>
    </Container>
  );
};

export default HomeSection;
