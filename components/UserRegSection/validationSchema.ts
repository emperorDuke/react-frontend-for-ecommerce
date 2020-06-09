import * as yup from "yup";

var password: string = "";

const UserRegValidationSchema = yup.object().shape({
  first_name: yup
    .string()
    .min(2, "name is too Short!")
    .max(20, "name is too Long!")
    .required("First name is required"),
  middle_name: yup
    .string()
    .min(2, "name is too Short!")
    .max(20, "name is too Long!")
    .notRequired(),
  last_name: yup
    .string()
    .min(2, "name is too Short!")
    .max(20, "name is too Long!")
    .required("Last name is required"),
  address: yup
    .string()
    .min(2, "Address is invalid")
    .notRequired(),
  phone_number: yup
    .string()
    .required("phone number is required")
    .min(11, "Invalid Phone Number"),
  email: yup
    .string()
    .email("Invalid Email")
    .required("Email is required"),
  password: yup
    .string()
    .required("password is required")
    .min(5, "password too Short!"),
  confirm_password: yup
    .string()
    .required("Confirm password")
    .when("password", {
      is: val => val !== undefined, 
      then: yup
        .string()
        .test(
          "same-password",
          "not same password",
          val => val === yup.ref("password")
        ),
      otherwise: yup.ValidationError
    })
});

export default UserRegValidationSchema;
