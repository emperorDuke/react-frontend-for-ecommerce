import Yup from "yup";

interface InitialValues {
  [key: string]: string | undefined;
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

export interface FormProps {
  schema: Yup.ObjectSchema<any>;
  initialValues: InitialValues;
  onSubmit: (body: InitialValues) => void;
  onCancel?: () => void;
  serverErrors?: InitialValues;
  serverSuccessMessage?: InitialValues;
}
