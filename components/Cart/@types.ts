import { CartType } from "../../redux/actionCreators/CartActions";

export type CartProps = {
    onChange: (qty:number, id?:number) => void;
    onDelete: (id: Pick<CartType, "index" | "id">) => void;
    items: Array<CartType>;
}
