import React from "react";
import { useSelector } from "react-redux";
import { RootStoreState as IState } from "../../redux/reducers/RootReducer";
import * as T from "./@types";
import { BehaviorSubject } from "rxjs";
import { toInt } from "../../utils/toInt";

const merchantStore$ = new BehaviorSubject<Array<T.EnhancedMerchantStore>>([]);

const merchantStoreEnhancer: T.MerchantStoreEnhancer = stores => {
  return stores.map(store => {
    return {
      ...store,
      link: `/store/${store.name}?id=${store.id}`, 
      href: `/store/[slug]`,
      as: `/store/${store.name}?id=${store.id}`
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
    merchantStore$.next(enhancedMerchantStore);
  }, [incomingMerchantStores]);

  React.useEffect(() => {
    merchantStore$.subscribe(val => setMerchantStores(val));

    return () => merchantStore$.unsubscribe();
  }, []);

  const get = (id?: number | string) => {
    return merchantStores.find(store => store.id === toInt(id));
  };

  const all = () => merchantStores;

  const getAds = (id?: number | string) =>  {
    const store = get(toInt(id));
    if (store) return store.adverts;
  }

  return {
    all,
    get,
    getAds,
  };
}

export * from "./@types";
