import { Epic } from "redux-observable";
import { EpicDepenciesType } from "../../../store";
import { isOfType } from "typesafe-actions";
import {
  filter,
  mergeMap,
  catchError,
  map,
  withLatestFrom,
} from "rxjs/operators";
import {
  PaymentInformationActionTypes,
  paymentInformation,
  paymentInformationSuceesful,
  paymentInformationFailed,
} from "../../actionCreators/PaymenInformation";
import { RootStoreState } from "../../reducers/RootReducer";
import { of } from "rxjs";
import { BEARER } from "../../utils/constants";
import { makeArray } from "../../../utils";

type PaymentInformationEpic = Epic<
  PaymentInformationActionTypes,
  PaymentInformationActionTypes,
  RootStoreState,
  EpicDepenciesType
>;

const PaymentInformationEpics: PaymentInformationEpic = (
  action$,
  state$,
  { http }
) =>
  action$.pipe(
    filter(isOfType(paymentInformation.REQUEST)),
    withLatestFrom(state$),
    mergeMap(([action, { userAuth: { token } }]) =>
      http
        .get(action.payload, {
          headers: { Authorization: `${BEARER} ${token}` },
        })
        .pipe(
          map(({ data: res }) => paymentInformationSuceesful(makeArray(res))),
          catchError((err) => of(paymentInformationFailed(err.response)))
        )
    )
  );

export default PaymentInformationEpics;
