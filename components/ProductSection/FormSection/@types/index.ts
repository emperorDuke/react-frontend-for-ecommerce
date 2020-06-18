import { EnhancedProductType } from "../../../../services";
import { AttributeType } from "../../../../redux/actionCreators/AttributeActions";
import { EnhancedMerchantStore } from "../../../../services";


export interface PropsType {
  product: EnhancedProductType;
  attributes: Array<AttributeType>;
  merchantStore: EnhancedMerchantStore;
}