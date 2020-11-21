import { AddressType } from "../../../redux/actionCreators/AddressActions";

export type Delivery = "pickupStation" | "doorDelivery";

export interface DeliverySectionProps {
    pickupStationId: number | string;
    setPickupStationId: (id: number | string) => void;
    pickupStations: AddressType[];
    deliveryType: Delivery | null;
    setDeliveryType: (param: Delivery | null) => void;
}