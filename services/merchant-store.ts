import React from "react";
import { useSelector } from "react-redux";
import { RootStoreState as IState } from "../redux/reducers/RootReducer";
import { toInt } from "../utils/toInt";
import { StoreType } from "../redux/actionCreators/StoreActions";
import { useMemoCompare } from "../utils/useMemoCompare";

export interface EnhancedMerchantStore extends StoreType {
  link?: string;
  href?: string;
  as?: string;
}

export type MerchantStoreEnhancer = (
  stores: Array<StoreType>
) => Array<EnhancedMerchantStore>;


export const merchantStoreEnhancer: MerchantStoreEnhancer = (stores) => {
  return stores.map((store) => {
    return {
      ...store,
      link: `/store/${store.name}?id=${store.id}`,
      href: `/store/[slug]`,
      as: `/store/${store.name}?id=${store.id}`,
    };
  });
};

export function useMerchantStore() {
  const incomingMerchantStores = useSelector(
    ({ stores }: IState) => stores.stores
  );

  const enhancedMerchantStore = React.useMemo(
    () => merchantStoreEnhancer(incomingMerchantStores),
    [incomingMerchantStores]
  );

  const [merchantStores, setMerchantStores] = React.useState(
    enhancedMerchantStore
  );

  React.useEffect(() => {
    setMerchantStores(enhancedMerchantStore);
  }, [enhancedMerchantStore]);

  const get = React.useCallback(
    (id?: number | string) => {
      return merchantStores.find((store) => store.id === toInt(id));
    },
    [merchantStores]
  );

  const all = React.useCallback(() => merchantStores, [merchantStores]);

  const getAds = React.useCallback(
    (id?: number | string) => {
      const store = get(toInt(id));
      if (store) return store.adverts;
    },
    [merchantStores]
  );

  return useMemoCompare({
    all,
    get,
    getAds,
  });
}
