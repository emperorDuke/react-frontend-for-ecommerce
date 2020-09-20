import { Epic } from "redux-observable";
import {
  AddressActionTypes,
  addressSuccessful,
  addressFailed,
  address,
  ShippingDetailType,
} from "../../actionCreators/AddressActions";
import { RootStoreState } from "../../reducers/RootReducer";
import { EpicDepenciesType } from "../../../store";
import {
  filter,
  map,
  switchMap,
  catchError,
  withLatestFrom,
} from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import { of } from "rxjs";
import { BEARER } from "../../utils/constants";
import Axios from "axios-observable";

type AddressEpic = Epic<
  AddressActionTypes,
  AddressActionTypes,
  RootStoreState,
  EpicDepenciesType
>;

const DeliveryAddressEpic: AddressEpic = (action$, state$) =>
  action$.pipe(
    filter(isOfType(address.REQUEST)),
    withLatestFrom(state$),
    switchMap(([action, { userAuth: { token } }]) =>
      Axios.get(action.payload, {
        headers: {
          Authorization: `${BEARER} ${token}`,
        },
      }).pipe(
        map(({ data: res }) =>
          Array.isArray(res) ? addressSuccessful(res) : addressSuccessful([res])
        ),
        catchError((err) => of(addressFailed(err.response)))
      )
    )
  );

export default DeliveryAddressEpic;
