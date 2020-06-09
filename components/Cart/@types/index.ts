import { CartType } from "../../../redux/actionCreators/CartActions";

export type CartProps = {
    onChange: (qty:number, id?:number) => void;
    onDelete: (id?:number) => void;
    items: Array<CartType>;
}
