import useSelector from "../redux/utils/useStoreSelector";

interface PaymentInformation {
  cardNo: number;
  cardType: "master" | "visa" | "verve";
  cvv: number;
  date: string;
}

export function useUser(userType: "seller" | "buyer") {
  const userAuth = useSelector(({ userAuth }) => userAuth);
  const incomingCart = useSelector(({ cart }) => cart.cart);
  const addressBook = useSelector(
    ({ addressBook }) => addressBook.shippingDetail
  );
  const user = useSelector(({ user }) => user.user);
  const orders = useSelector(({ orders }) => orders.orders);

  const cart = () => incomingCart;
  const profile = () => user;
  const auth = () => userAuth;

  switch (userType) {
    case "seller":
      return {
        profile,
        auth,
      };
    case "buyer":
      return {
        cart,
        profile,
        auth,
        addressBook: {
          all: () => addressBook,
          getDefault: () => addressBook.find((a) => a.default === true),
        },
        orders: {
          all: () => orders,
          get: (id: number) => orders.find((o) => o.id === id),
        },
      };
    default:
      return {};
  }
}
