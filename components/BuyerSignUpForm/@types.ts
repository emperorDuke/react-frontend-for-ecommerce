import { Schema } from "yup";

interface InitialValues {
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zip_code: string;
}

export interface FormProps {
  schema?: any;
  initialValues: InitialValues;
  onSubmit: (body: InitialValues) => void;
  onCancel?: () => void;
  serverErrors?: InitialValues;
}
