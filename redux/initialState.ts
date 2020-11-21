import { PickUpLocationState } from "./reducers/PickupLocationReducer";
import { AddressState } from "./reducers/AddressReducer";
import { RootStoreState } from "./reducers/RootReducer";

const shipping: AddressState = {
  shipping: [
    {
      id: 1,
      buyer: 2,
      address: {
        id: 1,
        address: "no 34 beckham street off emmanuel edem cresent, ikeja Lagos",
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
        address: "no 34 beckham street, ikeja Lagos",
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
        address: "no 34 beckham street, ikot-ansa calabar",
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
        address: "no 34 beckham street, ikeja Lagos",
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
  operations: { error: null, status: null },
};

const pickupLocations: PickUpLocationState = {
  pickUpLocations: [
    {
      id: "1",
      address: "No 34 beckham street off emmanuel edem cresent, ikeja Lagos",
      state: "Lagos",
      city: "Ikeja",
      country: "Nigeria",
      zip_code: "56777",
    },
    {
      id: "2",
      address: "No 34 beckham street off emmanuel edem cresent, ikeja",
      state: "Lagos",
      city: "Idimu",
      country: "Nigeria",
      zip_code: "56777",
    },
    {
      id: "3",
      address: "No 34 beckham street off emmanuel edem cresent, ikeja",
      state: "Abuja",
      city: "Maitama",
      country: "Nigeria",
      zip_code: "56777",
    },
    {
      id: "4",
      address: "No 34 beckham street off emmanuel edem cresent, ikeja",
      state: "Abuja",
      city: "Kubwa",
      country: "Nigeria",
      zip_code: "56777",
    },
    {
      id: "5",
      address: "No 34 beckham street off emmanuel edem cresent, ikeja",
      state: "Abuja",
      city: "Utako",
      country: "Nigeria",
      zip_code: "56777",
    },
    {
      id: 6,
      address: "No 34 beckham street off emmanuel edem cresent, ikeja",
      state: "Abuja",
      city: "Kubwa",
      country: "Nigeria",
      zip_code: "56777",
    },
    {
      id: 7,
      address: "No 34 beckham street off emmanuel edem cresent, ikeja",
      state: "Abuja",
      city: "Utako",
      country: "Nigeria",
      zip_code: "56777",
    },
    
    {
      id: 8,
      address: "No 34 beckham street off emmanuel edem cresent, ikeja",
      state: "Abuja",
      city: "Kubwa",
      country: "Nigeria",
      zip_code: "56777",
    },
    {
      id: 9,
      address: "No 34 beckham street off emmanuel edem cresent, ikeja",
      state: "Abuja",
      city: "Utako",
      country: "Nigeria",
      zip_code: "56777",
    },
  ],
  operations: { error: null, status: null },
};

export const preloadedState: Partial<RootStoreState> = {
  addressBook: shipping,
  pickUpLocations: pickupLocations
};
