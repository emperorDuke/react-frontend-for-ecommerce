import { useMemo, useCallback, useEffect, useState } from "react";
import useSelector from "../redux/utils/useStoreSelector";
import { PositionType } from "../redux/actionCreators/CarouselActions";
import { merchantStoreEnhancer, useMerchantStore } from "./merchant-store";
import { productEnhancer, useProduct } from "./product";
import { useDispatch } from "react-redux";
import { extendProducts } from "../redux/actionCreators/ProductActions";
import { extendStores } from "../redux/actionCreators/StoreActions";
import { useMemoCompare, useDidUpdateEffect } from "../utils";

export function useAds() {
  const internalAds = useSelector(({ carousels }) => carousels.carousels);
  const sponsored = useSelector(({ sponsoredItems }) => sponsoredItems);
  const dispatch = useDispatch();
  const product = useProduct();
  const merchantStore = useMerchantStore();

  const mappedItems = useMemo(() => {
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
      const ok =
        product.get(sponsoredProduct.product.id) ||
        productEnhancer([sponsoredProduct.product])[0];
      return {
        ...sponsoredProduct,
        product: ok,
      };
    });

    return { products, shops };
  }, [product]);

  const [items, setItems] = useState(mappedItems);

  useDidUpdateEffect(() => setItems(mappedItems), [mappedItems]);

  useEffect(() => {
    const storeProducts = sponsored.sponsoredStores
      .map((p) => p.products)
      .flat();
    const sponsoredProducts = sponsored.sponsoredProducts.map((p) => p.product);
    const sponsoredStores = sponsored.sponsoredStores.map((s) => s.store);
    dispatch(extendProducts([...storeProducts, ...sponsoredProducts]));
    dispatch(extendStores(sponsoredStores));
  }, [sponsored]);

  const getAdBlock = useCallback(
    (param: PositionType) =>
      internalAds.filter((ads) => ads.position === param),
    [internalAds]
  );

  const getSponsoredItems = useCallback(() => items, [items]);

  const all = useCallback(() => internalAds, [internalAds]);

  return useMemoCompare({
    getAdBlock,
    getSponsoredItems,
    all,
  });
}
