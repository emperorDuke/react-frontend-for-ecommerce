import { FetchOperationType } from "../../../service/Fetch/@types";
import * as T from "../../actionCreators/AttributeActions/@types";

export type AttributeState = {
  attributes: Array<T.AttributeType>;
  operations: {
    [opName: string]: FetchOperationType;
  };
};
