import { EnhancedProductType } from "../../../../services";
import { AttributeType } from "../../../../redux/actionCreators/AttributeActions";


export interface PropsType {
  product: EnhancedProductType;
  attributes: Array<AttributeType>;
}