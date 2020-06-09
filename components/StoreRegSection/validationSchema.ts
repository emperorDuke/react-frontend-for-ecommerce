import * as yup from "yup";

const validationSchema = yup.object().shape({
  address: yup
    .string()
    .required("store address is required")
    .min(2, "address invalid"),
  name: yup
    .string()
    .required("store name is required!")
    .min(2, "store name is too short"),
  location: yup.string().required("store location is required")
});

export default validationSchema;
