interface IntialValues {
  [key: string]: string;
  email: string;
  password: string;
}

export interface LoginFormProps {
  /**
   * The forms initial Values
   */
  initialValues: IntialValues;
  /**
   * A callback used to handle form submission
   */
  onSubmit: (params: IntialValues) => void;
  schema?: any;
  serverErrors?: IntialValues;
}
