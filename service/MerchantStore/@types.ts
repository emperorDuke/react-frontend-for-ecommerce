import { StoreType } from "../../redux/actionCreators/StoreActions";

export interface EnhancedMerchantStore extends StoreType {
  link?: string;
  href?: string;
  as?: string;
}

export type MerchantStoreEnhancer = (
  stores: Array<StoreType>
) => Array<EnhancedMerchantStore>;

export interface MerchantStoreReturnType<T = EnhancedMerchantStore> {
  merchantStores: Array<T>;
  getMerchantStore: (id: number) => T | undefined;
}
