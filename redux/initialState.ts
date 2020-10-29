import { FetchOperationType } from "../utils/Fetch";
import { ShippingDetailType } from "./actionCreators/AddressActions";

interface AddressState {
  shipping: Array<ShippingDetailType>;
  operations: {
    [opName: string]: FetchOperationType;
  };
}

const shipping: AddressState = {
  shipping: [
    {
      id: 1,
      buyer: 2,
      address: {
        id: 1,
        address: 'no 34 beckham street off emmanuel edem cresent, ikeja Lagos',
        state: "Lagos",
        city: "Ikeja",
        country: "Nigeria",
        zip_code: "56777",
      },
      default: true,
      first_name: "duke",
      last_name: "effiom",
      phone_number: "+2347037606116",
      added_at: "yyuguuugug",
    },
    {
      id: 2,
      buyer: 2,
      address: {
        id: 1,
        address: 'no 34 beckham street, ikeja Lagos',
        state: "Lagos",
        city: "Ikeja",
        country: "Nigeria",
        zip_code: "56777",
      },
      default: false,
      first_name: "duke",
      last_name: "effiom",
      phone_number: "+2347037606116",
      added_at: "yyuguuugug",
    },
    {
      id: 3,
      buyer: 2,
      address: {
        id: 1,
        address: 'no 34 beckham street, ikot-ansa calabar',
        state: "calabar",
        city: "ikot-ansa",
        country: "Nigeria",
        zip_code: "56777",
      },
      default: false,
      first_name: "saint-bassey",
      last_name: "effiom",
      phone_number: "+2347037606116",
      added_at: "yyuguuugug",
    },
    {
      id: 4,
      buyer: 2,
      address: {
        id: 1,
        address: 'no 34 beckham street, ikeja Lagos',
        state: "Abuja",
        city: "kubwa",
        country: "Nigeria",
        zip_code: "56777",
      },
      default: false,
      first_name: "duncan",
      last_name: "effiom",
      phone_number: "+2347037606116",
      added_at: "yyuguuugug",
    },
  ],
  operations: {
    fetchAddress: {
      error: null,
      status: null,
    },
  },
};

export const preloadedState = {
  addressBook: shipping,
};
