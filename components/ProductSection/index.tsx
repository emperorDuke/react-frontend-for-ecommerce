import React, { useEffect } from "react";
import FormSection from "./FormSection";
import CustomTab from "../CustomTab";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import StoreInfoSection from "./StoreInfoSection";
import { Slider, Slide } from "../Slider";
import Img from "../Img";
import {
  useMerchantStore,
  EnhancedMerchantStore,
  useProduct,
  apiUrl,
} from "../../services";
import { AttributeType } from "../../redux/actionCreators/AttributeActions";
import {
  SpecificationType,
  KeyFeatureType,
} from "../../redux/actionCreators/ProductMetaActions";
import { useDispatch } from "react-redux";
import { storeRequest } from "../../redux/actionCreators/StoreActions";
import PolicySection from "./PolicySection";
import useStyles from "./styles";
import CardEnhancer from "../CardEnhancer";
import ModularCard from "../AppCards/ProductModularCard";
import { productRequest } from "../../redux/actionCreators/ProductActions";

const ProductSection: React.ComponentType<{ id: string }> = (props) => {
  const product = useProduct();
  const merchantStore = useMerchantStore();
  const dispatch = useDispatch();
  const classes = useStyles();

  const item = product.get(props.id);
  const items = product.all().filter((p) => p.id !== Number(props.id));

  useEffect(() => {
    if (item) {
      const storeUrl = apiUrl("getMerchantStore", item.store);
      const itemsUrl = apiUrl("getProducts") + `?category=${item.category}`;

      dispatch(storeRequest(storeUrl));
      dispatch(productRequest(itemsUrl));
    }
  }, []);

  let images: Array<string> | undefined;
  let attributes: Array<AttributeType> | undefined;
  let store: EnhancedMerchantStore | undefined;
  let specifications: Array<SpecificationType> | undefined;
  let keyfeatures: Array<KeyFeatureType> | undefined;

  if (item) {
    images = product.getAttachments(item.id);
    attributes = product.getAttributes(item.id);
    specifications = product.getSpecifications();
    keyfeatures = product.getKeyfeatures();
    store = merchantStore.get(item.store);
  }

  return (
    <Container fixed>
      <Grid container spacing={1}>
        <Grid item xs={12} />
        {/** first group */}
        <Grid item xs={12} lg={9}>
          <Paper>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} lg={7}>
                <Slider
                  disableButtons
                  disableIndicator
                  showThumbs
                  effectType="slide"
                  infinite
                  width={400}
                  height={380}
                  thumbHeightFactor={6}
                >
                  {images &&
                    images.map((image) => (
                      <Slide key={image}>
                        <Img src={image} alt={image} />
                      </Slide>
                    ))}
                </Slider>
              </Grid>
              <Grid item xs={12} md={6} lg={5}>
                {item && attributes && (
                  <FormSection product={item} attributes={attributes} />
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item container spacing={1} xs={12} lg={3}>
          <Grid item xs={12} md={8} lg={12}>
            <Paper>
              <PolicySection />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={12}>
            <Paper className={classes.padding}>
              {store && <StoreInfoSection {...store} />}
            </Paper>
          </Grid>
        </Grid>
        {/** second group */}
        <Grid item xs={12}>
          {item && specifications && keyfeatures && (
            <CustomTab
              product={item}
              specifications={specifications}
              keyfeatures={keyfeatures}
            />
          )}
        </Grid>
        <Grid item>
          <CardEnhancer>
            {items.map((p) => (
              <ModularCard {...p} />
            ))}
          </CardEnhancer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductSection;
