import React from "react";
import useSelector from "../redux/utils/useStoreSelector";
import { PositionType } from "../redux/actionCreators/CarouselActions";
import { merchantStoreEnhancer, useMerchantStore } from "./merchant-store";
import { productEnhancer, useProduct } from "./product";
import { useDispatch } from "react-redux";
import { extendProducts } from "../redux/actionCreators/ProductActions";
import { extendStores } from "../redux/actionCreators/StoreActions";
import { useMemoCompare } from "../utils/useMemoCompare";

export function useAds() {
  const internalAds = useSelector(({ carousels }) => carousels.carousels);
  const sponsored = useSelector(({ sponsoredItems }) => sponsoredItems);
  const dispatch = useDispatch();
  const product = useProduct();
  const merchantStore = useMerchantStore();

  const mappedSponsoredItems = React.useMemo(() => {
    const shops = sponsored.sponsoredStores.map((store) => {
      const products = store.products.map((storeProduct) => {
        const ok = product.get(storeProduct.id);
        if (ok) return ok;
        else return productEnhancer([storeProduct])[0];
      });

      const enhancedMerchantStore = () => {
        const ok = merchantStore.get(store.store.id);
        if (ok) return ok;
        else return merchantStoreEnhancer([store.store])[0];
      };

      return {
        ...store,
        products,
        store: enhancedMerchantStore(),
      };
    });

    const products = sponsored.sponsoredProducts.map((sponsoredProduct) => {
      const ok = product.get(sponsoredProduct.product.id);
      if (ok) return ok;
      else return productEnhancer([sponsoredProduct.product])[0];
    });

    return { products, shops };
  }, [product]);

  const [sponsoredItems, setSponsoredItems] = React.useState(
    mappedSponsoredItems
  );

  React.useEffect(() => {
    setSponsoredItems(mappedSponsoredItems);
  }, [mappedSponsoredItems]);

  React.useEffect(() => {
    const storeProducts = sponsored.sponsoredStores.flatMap((p) => p.products);
    const sponsoredProducts = sponsored.sponsoredProducts.map((p) => p.product);
    const sponsoredStores = sponsored.sponsoredStores.map((s) => s.store);
    dispatch(extendProducts([...storeProducts, ...sponsoredProducts]));
    dispatch(extendStores(sponsoredStores));
  }, [sponsored]);

  const getAdBlock = React.useCallback(
    (param: PositionType) =>
      internalAds.filter((ads) => ads.position === param),
    [internalAds]
  );

  const getSponsoredItems = React.useCallback(() => sponsoredItems, [
    sponsoredItems,
  ]);

  const all = React.useCallback(() => internalAds, [internalAds]);

  const adsUtils = useMemoCompare({
    getAdBlock,
    getSponsoredItems,
    all,
  });

  return adsUtils;
}
