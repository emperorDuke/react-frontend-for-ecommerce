import { CartType } from "../../redux/actionCreators/CartActions";

export type CartProps = {
  onChange: (qty: number, id?: number) => void;
  onDelete: (id: Pick<CartType, "_index" | "id">) => void;
  cart: Array<CartType>;
};
