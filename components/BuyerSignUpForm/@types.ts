import Yup from "yup";

interface InitialValues {
  [key: string]: string | number |  undefined ;
  id?: string | number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email?: string;
  password?: string;
  address?: string;
  country?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}

export interface BuyerSignUpFormProps {
  schema: Yup.ObjectSchema<any>;
  initialValues: InitialValues;
  onSubmit: (body: InitialValues, id?: string | number) => void;
  onCancel?: () => void;
  serverErrors?: InitialValues;
  serverSuccessMessage?: InitialValues;
}
