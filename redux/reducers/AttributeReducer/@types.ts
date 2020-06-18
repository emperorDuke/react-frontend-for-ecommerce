import { FetchOperationType } from "../../../utils/Fetch/@types";
import * as T from "../../actionCreators/AttributeActions/@types";

export type AttributeState = {
  attributes: Array<T.AttributeType>;
  operations: {
    [opName: string]: FetchOperationType;
  };
};
