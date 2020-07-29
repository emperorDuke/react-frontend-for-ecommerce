import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import CardEnhancer from "../CardEnhancer";
import NavBar from "../NavBar";
import useStyles from "./styles";
import ModularCard from "../AppCards/ProductModularCard";
import Slider from "../Slider";
import Slide from "../Slider/Slide";
import Img from "../Img";
import useSelector from "../../redux/utils/useStoreSelector";
import { useListings, useAds, useMerchantStore } from "../../services";
import Link from "../Link";
import data from "./text";

const HomeSection: React.ComponentType = () => {
  const ads = useAds();
  const listings = useListings();
  const merchantStore = useMerchantStore();
  const categories = useSelector(({ categories }) => categories.categories);
  const classes = useStyles();
  const centerAds = ads.getAdBlock("CENTER");
  const mainAds = ads.getAdBlock("MAIN");

  const randomStores = merchantStore
    .all()
    .filter((store) => !store.verified)
    .map((store) => (
      <Grid item key={store.name} xs>
        <Card>
          <Link href={store.href} as={store.as}>
            <CardContent>
              <Grid
                container
                alignItems="center"
                justify="flex-start"
                spacing={1}
                wrap="nowrap"
              >
                <Grid item xs={4}>
                  <Img
                    src={store.logo}
                    alt={store.name}
                    style={{ width: "100%", height: "40px" }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="subtitle1" noWrap>
                    {store.name}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Link>
        </Card>
      </Grid>
    ));

  const officialBrands = (
    <Grid container spacing={1}>
      {merchantStore
        .all()
        .filter((store) => store.verified)
        .map((store) => (
          <Grid item md={6} key={store.name}>
            <Img src={store.logo} alt={store.name} />
          </Grid>
        ))}
    </Grid>
  );

  const sponsoredStores = ads.getSponsoredItems().shops.map((shop) => (
    <Grid item key={shop.store.name}>
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
          <Grid
            item
            container
            direction="row"
            spacing={1}
            key={centerAds[i].name}
          >
            <Grid item md={12}>
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
          <Grid
            item
            container
            direction="row"
            spacing={1}
            key={`${centerAds[i].name}${centerAds[nextIndex].name}`}
          >
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

  const sponsoredProducts = ads.getSponsoredItems().products.length > 0 && (
    <Grid item key={9090}>
      <Paper className={classes.cardMasterLayout}>
        <CardEnhancer
          appBar
          appBarProps={{ text: "Sponsored products", link: "/" }}
        >
          {ads.getSponsoredItems().products.map((product) => (
            <ModularCard {...product.product} key={product.id} />
          ))}
        </CardEnhancer>
      </Paper>
    </Grid>
  );

  const listedProducts = listings.all().map((listing) =>
    Object.keys(listing).map((key, i) => (
      <Grid item key={`${key}${i}`} md sm xs>
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

      if (i >= sponsoredStores.length) {
        joggledComponents.push(listedProducts[i][0]);
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
          <Grid item sm={4} md={3} lg={3}>
            <NavBar navItems={categories} />
          </Grid>
          <Grid item sm={8} md={6} lg={6}>
            <Slider autoplay showThumbs infinite>
              {mainAds.map((ad) => (
                <Slide caption={ad.caption} key={ad.id}>
                  <Img src={ad.attachment} alt={ad.name} />
                </Slide>
              ))}
            </Slider>
          </Grid>
          <Grid item xs={3} sm md lg/>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item xs={3} />
          <Grid item container xs={6} spacing={1}>
            <Grid item xs>
              <Card>
                <Link href="/">
                  <CardContent>
                    <Grid
                      container
                      alignItems="center"
                      justify="flex-start"
                      spacing={1}
                      wrap="nowrap"
                    >
                      <Grid item xs={4}>
                        <img
                          src="/static/midea_a95757a4cfec5b22202e7f9304481d50.jpg"
                          alt="cards"
                          style={{ width: "100%", height: "40px" }}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="subtitle1" noWrap>
                          Store locator
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Link>
              </Card>
            </Grid>
            {randomStores}
          </Grid>
          <Grid item xs={3} />
        </Grid>
        {joggler()}
        <Grid item>
          <Paper className={classes.cardMasterLayout}>{officialBrands}</Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.cardMasterLayout}>
            <Typography variant="h4">{data.heading}</Typography>
            <Typography variant="body1" component="p">
              {data.body}
            </Typography>
          </Paper>
        </Grid>

        {/* ///////////// spacer //////////////////// */}
        <Grid item />
        {/* ///////////// spacer //////////////////// */}
      </Grid>
    </Container>
  );
};

export default HomeSection;
