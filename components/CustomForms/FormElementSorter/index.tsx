import React from "react";
import CustomSelect, { CustomSelectProps } from "../CustomSelectHtml";
import CustomInput, { CustomInputProps } from "../CustomInputHtml";
import ErrorTag from "../ErrorHtmlElement";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { FormikProps } from "formik";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margins: {
      margin: theme.spacing(1)
    },
    font: {
      fontSize: theme.typography.fontSize,
      fontFamily: theme.typography.fontFamily
    }
  })
);

interface Props {
  formParams: Array<CustomSelectProps | CustomInputProps>;
  formikBag: Omit<
    FormikProps<{ [field: string]: string }>,
    "isSubmitting" | "handleSubmit"
  >;
}

const Element:React.ComponentType<Props> = ({
  formParams,
  formikBag: { errors, touched, setFieldError, ...restFormikBag }
}) => {
  const classes = useStyles();

  const formElements = formParams.map(({ example, label, ...param }) => {
    let formControl = <></>;
    let params = undefined;

    if (param.responseError) setFieldError(param.field, param.responseError);

    switch (param.type) {
      case "select":
        params = param as CustomSelectProps;
        formControl = (
          <FormControl
            key={params.id}
            fullWidth
            className={classes.margins}
            error={Boolean(errors[params.field])}
          >
            <InputLabel htmlFor={params.id} className={classes.font}>
              {label}:
            </InputLabel>
            {errors[params.field] && touched[params.field] ? (
              <ErrorTag errorMessage={errors[params.field]} />
            ) : null}
            <CustomSelect
              {...params}
              {...restFormikBag}
              className={classes.font}
            />
            {example ? <FormHelperText>{example}</FormHelperText> : null}
          </FormControl>
        );

        break;
      default:
        params = param as CustomInputProps;
        formControl = (
          <FormControl
            key={params.id}
            fullWidth
            className={classes.margins}
            error={Boolean(errors[params.field])}
          >
            <InputLabel htmlFor={params.id} className={classes.font}>
              {label}:
            </InputLabel>
            {errors[params.field] && touched[params.field] ? (
              <ErrorTag errorMessage={errors[params.field]} />
            ) : null}
            <CustomInput
              {...param}
              {...restFormikBag}
              className={classes.font}
            />
            {example ? <FormHelperText>{example}</FormHelperText> : null}
          </FormControl>
        );

        break;
    }

    return formControl;
  });

  return <>{formElements}</>;
};

export default Element;
