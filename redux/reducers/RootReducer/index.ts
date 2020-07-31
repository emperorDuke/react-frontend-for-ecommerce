import { combineReducers } from "redux";

import StoreReducer from "../StoreReducer";
import ProductReducer from "../ProductReducer/";
import CarouselReducer from "../CarouselReducer";
import PostReducer from "../PostReducer";
import CartReducer from "../CartReducer";
import CategoryReducer from "../CategoryReducer";
import LocationReducer from "../LocationReducer";
import filterReducer from "../FilterReducer";
import UserAuthReducer from "../UserAuthReducer";
import PickupLocationReducer from "../PickupLocationReducer";
import AddressReducer from "../AddressReducer";
import PaymentInformationReducer from "../PaymentInformationReducer";
import AttributeReducer from "../AttributeReducer";
import MetaReducer from "../ProductMetaReducer";
import UserReducer from "../UserReducer";
import orderReducer from "../OrderReducer";
import SponsoredReducer from "../SponsoredReducer";
import { listingReducer } from "../ProductListingReducer";

export * from "./@types";

export default combineReducers({
  stores: StoreReducer,
  products: ProductReducer,
  carousels: CarouselReducer,
  posts: PostReducer,
  cart: CartReducer,
  categories: CategoryReducer,
  locations: LocationReducer,
  filters: filterReducer,
  pickUpLocations: PickupLocationReducer,
  addressBook: AddressReducer,
  paymentInformation: PaymentInformationReducer,
  attributes: AttributeReducer,
  productMetas: MetaReducer,
  user: UserReducer,
  orders: orderReducer,
  sponsoredItems: SponsoredReducer,
  listings: listingReducer,
  userAuth: UserAuthReducer
});
