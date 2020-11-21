import { ShippingDetailType } from "../../../redux/actionCreators/AddressActions";
import { BuyerSignUpFormProps } from "../../BuyerSignUpForm";

type FormPropsRequired = Pick<
  BuyerSignUpFormProps,
  "initialValues" | "onSubmit" | "schema" | "serverErrors"
>;

export type InitialValues = BuyerSignUpFormProps["initialValues"];

export interface DefaultAddressProps {
  shipping: ShippingDetailType[];
}

export interface AddressDialogFormProps extends FormPropsRequired {
  dialogState: boolean;
  setDialogState: (param: boolean) => void;
}
