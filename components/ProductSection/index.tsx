import React from "react";
import FormSection from "./FormSection";
import CustomTab from "../CustomTab";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import StoreInfoSection from "./StoreInfoSection";
import { useProduct } from "../../service/Product";
import Slider from "../Slider";
import Slide from "../Slider/Slide";
import Img from "../Img";
import {
  useMerchantStore,
  EnhancedMerchantStore
} from "../../service/MerchantStore";
import { AttributeType } from "../../redux/actionCreators/AttributeActions";
import {
  SpecificationType,
  KeyFeatureType
} from "../../redux/actionCreators/ProductMetaActions";

const ProductSection: React.ComponentType<{ id: string }> = props => {
  const globalProduct = useProduct();
  const merchantStore = useMerchantStore();

  const product = globalProduct.get(props.id);

  let images: Array<string> | undefined;
  let attributes: Array<AttributeType> | undefined;
  let store: EnhancedMerchantStore | undefined;
  let specifications: Array<SpecificationType> | undefined;
  let keyfeatures: Array<KeyFeatureType> | undefined;

  if (product) {
    images = globalProduct.getAttachments(product.id);
    attributes = globalProduct.getAttributes(product.id);
    store = merchantStore.get(product.store);
    specifications = globalProduct.getSpecifications();
    keyfeatures = globalProduct.getKeyfeatures();
  }

  return (
    <Container fixed>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Paper>
            <Grid container spacing={1}>
              <Grid item>
                <Slider
                  disableButtons
                  disableIndicator
                  showThumbs
                  width={565}
                  height={400}
                >
                  {images &&
                    images.map(image => (
                      <Slide key={image}>
                        <Img src={image} alt={image} />
                      </Slide>
                    ))}
                </Slider>
              </Grid>
              <Grid item>
                {product && store && attributes && (
                  <FormSection
                    product={product}
                    merchantStore={store}
                    attributes={attributes}
                  />
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item sm={3} xs>
              {store && <StoreInfoSection store={store} />}
            </Grid>
            <Grid item sm={6} xs>
              {product &&
                specifications &&
                keyfeatures && (
                  <CustomTab
                    product={product}
                    specifications={specifications}
                    keyfeatures={keyfeatures}
                  />
                )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item />
      </Grid>
    </Container>
  );
};

export default ProductSection;
