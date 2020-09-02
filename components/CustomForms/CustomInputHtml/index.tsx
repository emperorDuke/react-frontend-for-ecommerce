import React from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import InputBase from "@material-ui/core/InputBase";
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Red from "@material-ui/core/colors/red";
import Blue from "@material-ui/core/colors/blue";
import Grey from "@material-ui/core/colors/grey";
import { FormikProps } from "formik";

export const BootstrappedInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
    },
    input: {
      border: `1px solid ${Grey[400]}`,
      position: "relative",
      borderRadius: 4,
      backgroundColor: theme.palette.background.paper,
      padding: "8px 10px 8px 10px",
      transition: theme.transitions.create(["border-color", "box-shadow"], {
        duration: "200ms",
        easing: "ease-in",
        delay: "10ms",
      }),
      "&:focus": {
        borderColor: `${theme.palette.secondary.dark}`,
        boxShadow: `0 0 0 3px ${theme.palette.secondary.light}`,
        borderRadius: 4,
      },
    },
    error: {
      border: `1px solid ${Red[300]}`,
      borderRadius: 4,
      boxShadow: `0 0 0 1px ${Red[100]}`,
    },
  })
)(InputBase);

export interface CustomInputProps {
  label?: string;
  id?: string;
  type: string;
  field: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (args: React.SyntheticEvent<HTMLInputElement>) => void;
  onBlur?: (args: React.SyntheticEvent<HTMLInputElement>) => void;
  className?: string;
  example?: string;
  responseError?: string;
}

type Props = CustomInputProps &
  Pick<
    FormikProps<{ [key: string]: string }>,
    Exclude<
      keyof FormikProps<{ [key: string]: string }>,
      "isSubmitting" | "handleSubmit" | "errors" | "touched" | "setFieldError"
    >
  >;

const CustomInputElement = ({
  handleBlur,
  handleChange,
  values,
  type,
  field,
  ...rest
}: Props) => {
  const props = {
    className: rest.className,
    placeholder: rest.placeholder,
    id: rest.id,
  };

  return (
    <>
      <BootstrappedInput
        type={type}
        value={values[field]}
        onChange={handleChange}
        onBlur={handleBlur}
        name={field}
        {...props}
      />
    </>
  );
};

export default CustomInputElement;
