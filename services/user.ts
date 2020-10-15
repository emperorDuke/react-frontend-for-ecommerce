import useSelector from "../redux/utils/useStoreSelector";
import { UserType } from "../redux/actionCreators/UserActions";
import { CartType } from "../redux/actionCreators/CartActions";
import { ShippingDetailType } from "../redux/actionCreators/AddressActions";
import { OrderType } from "../redux/actionCreators/OrderActions";

interface PaymentInformation {
  cardNo: number;
  cardType: "master" | "visa" | "verve";
  cvv: number;
  date: string;
}

interface Auth {
  isLoggedIn: boolean;
  token: any;
}

interface Seller {
  profile: () => UserType;
  auth: () => Auth;
}

interface Buyer {
  profile: () => UserType;
  auth: () => Auth;
  cart: () => CartType[];
  addressBook: {
    all: () => ShippingDetailType[];
    getDefault: () => ShippingDetailType | undefined;
  }
  orders: {
    all: () => OrderType[];
    get: (id: number) => OrderType | undefined;
  }
}


export function useUser<T extends "seller" | "buyer">(userType: T)  {
  const userAuth = useSelector(({ userAuth }) => userAuth);
  const incomingCart = useSelector(({ cart }) => cart.cart);
  const shipping = useSelector(
    ({ addressBook }) => addressBook.shipping
  );
  const user = useSelector(({ user }) => user.user);
  const orders = useSelector(({ orders }) => orders.orders);

  const cart = () => incomingCart;
  const profile = () => user;
  const auth = () => userAuth;

  if (userType === "seller") {
    return {
      profile,
      auth,
    }
  } else {
    return {
      cart,
      profile,
      auth,
      shipping: {
        all: () => shipping,
        getDefault: () => {
          return shipping.find((a) => a.default === true)
        },
      },
      orders: {
        all: () => orders,
        get: (id: number) => orders.find((o) => o.id === id),
      },
    };
  }
}
