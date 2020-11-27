import { PickupStation } from "../../../redux/actionCreators/PickupLocations";

export type Delivery = "pickupStation" | "doorDelivery";

export interface DeliverySectionProps {
    pickupStationId: number | string;
    setPickupStationId: (id: number | string) => void;
    pickupStations: PickupStation[];
    deliveryType?: Delivery;
    setDeliveryType: (param?: Delivery) => void;
    defaultState?: string
}