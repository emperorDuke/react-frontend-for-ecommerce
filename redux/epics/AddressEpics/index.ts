import { Epic } from "redux-observable";
import {
  AddressActionTypes,
  addressSuccessful,
  addressFailed,
  address,
  ShippingDetailType
} from "../../actionCreators/AddressActions";
import { RootStoreState } from "../../reducers/RootReducer";
import { EpicDepenciesType } from "../../../store";
import {
  filter,
  map,
  switchMap,
  catchError,
  withLatestFrom
} from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import { of } from "rxjs";

type AddressEpic = Epic<
  AddressActionTypes,
  AddressActionTypes,
  RootStoreState,
  EpicDepenciesType
>;

const DeliveryAddressEpic: AddressEpic = (action$, state$, { http }) =>
  action$.pipe(
    filter(isOfType(address.REQUEST)),
    withLatestFrom(state$),
    switchMap(([action, { userAuth: { token } }]) =>
      http
        .getJSON<Array<ShippingDetailType> | ShippingDetailType>(action.payload, {
          Authorization: token
        })
        .pipe(
          map(res =>
            Array.isArray(res)
              ? addressSuccessful(res)
              : addressSuccessful([res])
          ),
          catchError(err => of(addressFailed(err.response)))
        )
    )
  );

export default DeliveryAddressEpic;
