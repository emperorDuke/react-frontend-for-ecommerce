import { MetaType } from "../../actionCreators/ProductMetaActions";
import { FetchOperationType } from "../../../utils/Fetch/@types";

export interface MetaStateType {
  productMeta: MetaType;
  operations: {
    [key: string]: FetchOperationType;
  };
}
