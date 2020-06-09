import useSelector from "../../redux/useStoreSelector";


interface PaymentInformation {
  cardNo: number;
  cardType: "master" | "visa" | "verve";
  cvv: number;
  date: string;
}

export function useBuyer() {
  const userAuth = useSelector(({ userAuth }) => userAuth);
  const incomingCart = useSelector(({ cart }) => cart.cart);
  const addressBook = useSelector(({ addressBook }) => addressBook.shippingDetail);
  const buyer = useSelector(({ user }) => user.user);
  const orders = useSelector(({ orders }) => orders.orders);

  const cart = () => incomingCart;
  const profile = () => buyer;
  const auth = () => userAuth;

  return {
    cart,
    profile,
    auth,
    addressBook: {
      all: () => addressBook,
      getDefault: () => addressBook.find(address => address.default === true)
    },
    orders: {
      all: () => orders,
      get: (id: number) => orders.find(o => o.id === id)
    }
  };
}