import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import useStyles from "./styles";
import { useProduct, useMerchantStore } from "../../services";
import { Slider, Slide } from "../Slider";
import Img from "../Img";
import CardGroup from "../CardGroup";
import ModularCard from "../AppCards/ProductModularCard";

interface StoreSectionProps {
  storeId: string | number;
}

const StoreSection: React.ComponentType<StoreSectionProps> = (props) => {
  const classes = useStyles();
  const product = useProduct();
  const merchantStore = useMerchantStore();

  const ads = merchantStore.getAds(props.storeId);
  const products = product.all();

  return (
    <Container fixed>
      <Grid container direction="column">
        <Grid item>
          <Slider type="carousel" autoplay showThumbs >
            {ads &&
              ads.map((ad) => (
                <Slide caption={ad.text}>
                  <Img src={ad.attachment} alt={ad.text} />
                </Slide>
              ))}
          </Slider>
        </Grid>
        <Grid item>
          <Paper>
            <CardGroup size="md">
              {products.map((product) => (
                <ModularCard {...product} key={product.id} />
              ))}
            </CardGroup>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StoreSection;
