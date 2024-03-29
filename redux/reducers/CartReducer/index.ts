import {
	CartActionTypes,
	cart,
	CartType,
} from "../../actionCreators/CartActions";
import { FetchOperationType, FetchConst } from "../../../utils/Fetch/@types";

interface CartState {
	cart: Array<CartType>;
	operations: {
		[opName: string]: FetchOperationType;
	};
}

const initialState: CartState = {
	cart: [],
	operations: {
		fetchCart: {
			status: null,
			error: null,
		},
	},
};

function stateChecker(cart: any[], action: any) {
	if (cart) {
		return [...cart, { ...action.payload }];
	}

	return [action.payload];
}

export default function cartReducer(
	state = initialState,
	action: CartActionTypes
) {
	switch (action.type) {
		case cart.ADD_ITEM:
			return {
				...state,
				cart: stateChecker(state.cart, action).map((cart, i) => {
					cart["_index"] = i;
					return cart;
				}),
			};
		case cart.UPDATE_CART:
			return {
				...state,
				cart: state.cart.map((cart) => {
					if (cart._index === action.payload._index) {
						return { ...cart, ...action.payload };
					}
					return cart;
				}),
			};
		case cart.REQUEST:
			return {
				...state,
				operations: {
					fetchCart: {
						status: FetchConst.FETCH_IN_PROCESS,
						error: null,
					},
				},
			};
		case cart.FETCH_SUCCESSFUL:
			return {
				...state,
				cart: action.payload.map((cart, i) => {
					cart["_index"] = i;
					return cart;
				}),
				operations: {
					fetchCart: {
						status: FetchConst.FETCH_SUCCESSFUL,
						error: null,
					},
				},
			};
		case cart.FETCH_FAILED:
			return {
				...state,
				operations: {
					fetchCart: {
						status: FetchConst.FETCH_FAILED,
						error: action.payload,
					},
				},
			};
		case cart.LOAD_CART:
			return {
				...state,
				cart: action.payload,
			};
		case cart.REMOVE_ITEM:
			return {
				...state,
				cart: state.cart.filter((cart) => cart._index !== action.payload._index),
			};
		default:
			return state;
	}
}
