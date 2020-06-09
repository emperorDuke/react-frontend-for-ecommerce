import { EnhancedProductType } from "../../../../service/Product";
import { AttributeType } from "../../../../redux/actionCreators/AttributeActions";
import { EnhancedMerchantStore } from "../../../../service/MerchantStore/@types";


export interface PropsType {
  product: EnhancedProductType;
  attributes: Array<AttributeType>;
  merchantStore: EnhancedMerchantStore;
}