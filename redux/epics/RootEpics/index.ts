import { combineEpics } from "redux-observable";

import CartEpics from "../CartEpics";
import StoreEpics from "../StoreEpics";
import ProductEpic from "../ProductEpics";
import postEpic from "../PostEpics";
import filterEpic from "../FilterEpics";
import CategoryEpics from "../CategoryEpics";
import LocationEpics from "../LocationEpics";
import PickupLocationEpic from "../PickupLocationEpics";
import DeliveryAddressEpic from "../AddressEpics";
import PaymentInformationEpics from "../PaymentInformationEpics";
import AttributeEpics from "../AttributeEpics";
import MetaEpics from "../MetaEpics";



export default combineEpics(
    CartEpics,
    StoreEpics,
    ProductEpic,
    postEpic,
    filterEpic,
    CategoryEpics,
    LocationEpics,
    PickupLocationEpic,
    DeliveryAddressEpic,
    PaymentInformationEpics,
    AttributeEpics,
    MetaEpics
);