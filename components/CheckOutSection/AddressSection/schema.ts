import * as yup from "yup";

export const shippingSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("first name is required !")
    .min(2, "first name is too short !"),
  last_name: yup
    .string()
    .required("last name is required !")
    .min(2, "last name is too short !"),
  address: yup.string().min(2, "Address is invalid !").notRequired(),
  phone_number: yup
    .string()
    .required("phone number is required")
    .min(11, "Invalid Phone Number"),
  country: yup.string().required("country is required !"),
  city: yup.string().required("city is required !"),
  state: yup.string().required("state is required !"),
  zip_code: yup.string().notRequired(),
});
