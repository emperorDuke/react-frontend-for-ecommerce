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

const ProductSection: React.ComponentType<{ id: string }> = (props) => {
  const product = useProduct();
  const merchantStore = useMerchantStore();
  const dispatch = useDispatch();

  const item = product.get(props.id);

  useEffect(() => {
    if (item) {
      dispatch(storeRequest(apiUrl("getMerchantStore", item.store)));
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
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Paper>
            <Grid container spacing={1}>
              <Grid item md={4} lg={4}>
                <Slider
                  disableButtons
                  disableIndicator
                  showThumbs
                  effectType="fade"
                  width={300}
                  height={500}
                  thumbHeightFactor={8}
                >
                  {images &&
                    images.map((image) => (
                      <Slide key={image}>
                        <Img src={image} alt={image} />
                      </Slide>
                    ))}
                </Slider>
              </Grid>
              <Grid item>
                {item && attributes && (
                  <FormSection product={item} attributes={attributes} />
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item md={4} lg={4}>
              {store && <StoreInfoSection {...store} />}
            </Grid>
            <Grid item sm={6} xs>
              {item && specifications && keyfeatures && (
                <CustomTab
                  product={item}
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
