import * as actions from "../../actionCreators/CartActions";
import { Epic } from "redux-observable";
import { RootStoreState } from "../../reducers/RootReducer";
import { StoreActionTypes } from "../../actionCreators/StoreActions";
import { AttributeActionType } from "../../actionCreators/AttributeActions";
import { ProductActionType } from "../../actionCreators/ProductActions";
import { EpicDepenciesType } from "../../../store";

export type CartEpic = Epic<
actions.CartActionTypes,
actions.CartActionTypes,
RootStoreState,
EpicDepenciesType
>;

export type InputType =
| actions.CartActionTypes
| StoreActionTypes
| AttributeActionType
| ProductActionType;

export type OutputType = InputType;

export type CartDepenciesEpic = Epic<
InputType,
OutputType,
RootStoreState,
EpicDepenciesType
>;