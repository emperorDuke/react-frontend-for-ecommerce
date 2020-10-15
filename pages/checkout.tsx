import { NextPage, NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import { Container } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCookie } from "../cookie";
import { restoreState } from "../redux/actionCreators/UserAuthActions";
import { apiUrl as path } from "../services";
import { userSuccesful, userFailed } from "../redux/actionCreators/UserActions";
import {
  addressSuccessful,
  addressFailed,
} from "../redux/actionCreators/AddressActions/AddressActions";
import {
  pickUpLocationSuccessful,
  pickUpLocationFailed,
} from "../redux/actionCreators/PickupLocations";
import CheckOut from "../components/CheckOutSection/CheckOut";
import { TOKEN, USERID } from "../utils/cookieConstants";
import { BEARER } from "../redux/utils/constants";
import {
  map,
  takeWhile,
  exhaustMap,
  catchError,
  toArray,
} from "rxjs/operators";
import { merge, of, forkJoin, Observable, EMPTY, from } from "rxjs";
import {
  cartRequestSuccessful,
  cartRequestFailed,
  CartType,
} from "../redux/actionCreators/CartActions";
import {
  ProductType,
  productSuccess,
} from "../redux/actionCreators/ProductActions";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { makeArray } from "../utils";

function fetchCart(headers: AxiosRequestConfig["headers"]) {
  return from(
    axios.get(path("getCarts"), {
      headers,
    })
  ).pipe(
    map(({ data: cart }: AxiosResponse<CartType[]>) => cart),
    takeWhile((cart) => !!cart.length),
    exhaustMap((cart) =>
      merge(
        of(cartRequestSuccessful(cart)),
        forkJoin(
          cart.map(
            ({ product }): Observable<ProductType> =>
              from(
                axios.get(path("getProduct", product), {
                  headers: headers["Content-Type"],
                })
              ).pipe(
                map(({ data }: AxiosResponse<ProductType>) => data),
                catchError(() => EMPTY)
              )
          )
        ).pipe(map(productSuccess))
      )
    ),
    catchError((err) => of(cartRequestFailed(err.response.data))),
    toArray()
  );
}

const Checkout: NextPage = () => {
  return (
    <Container>
      <Header />
      <CheckOut />
      <Footer />
    </Container>
  );
};

// Checkout.getInitialProps = async (ctx: NextPageContext & NextJSContext) => {
//   const token = getCookie(TOKEN, ctx.req);
//   const userId = getCookie(USERID, ctx.req);
//   const dispatch = ctx.store.dispatch;

//   if (token) {
//     dispatch(restoreState(token));

//     const headers = {
//       Authorization: `${BEARER} ${token}`,
//       "Content-Type": "application/json",
//     };

//     const actions = await Promise.all([
//       axios
//         .get(path("getShippingDetails"), { headers })
//         .then((response) => addressSuccessful(makeArray(response.data)))
//         .catch((error) => addressFailed(error.response.data)),
//       axios
//         .get(path("getBuyer", userId), { headers })
//         .then((response) => userSuccesful(response.data))
//         .catch((error) => userFailed(error.response.data)),
//       axios
//         .get(path("getPickupLocation"), { headers })
//         .then((response) => pickUpLocationSuccessful(response.data))
//         .catch((error) => pickUpLocationFailed(error.response.data)),
//     ]);

//     const cartActions = await fetchCart(headers).toPromise();

//     actions.forEach(dispatch);
//     cartActions.forEach(dispatch);
//   }

//   return {};
// };

export default Checkout;
