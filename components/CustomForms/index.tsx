import React from "react";
import FormImageViewer, { ImageTypes } from "./FormImageViewer";
import InputTagForImage, {
  InputElementForImageProps,
  ImageField
} from "./InputTagForImages";
import AnyInputElement from "./FormElementSorter";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import { Schema } from "yup";
import { CustomSelectProps } from "./CustomSelectHtml";
import { CustomInputProps } from "./CustomInputHtml";

export interface FormValues {
  [field: string]: string;
}

interface Props {
  formParams: Array<CustomSelectProps | CustomInputProps>;
  moreForms?: boolean;
  logIn?: boolean;
  onPost: (arg_1: {}, arg_2?: Array<ImageField>) => void;
  errorMessage?: string;
  fieldParams?: InputElementForImageProps;
  imageParams?: ImageTypes;
  initialValues: FormValues;
  validate?: (values: FormValues) => {};
  ValidationSchema?: Schema<any> | ((props: any) => Schema<any>);
}

const CustomForm = ({
  formParams,
  onPost,
  imageParams,
  fieldParams,
  initialValues,
  ValidationSchema,
  ...rest
}: Props) => {
  const buttonChildren = rest.moreForms
    ? "Continue"
    : rest.logIn
    ? "Log in"
    : "Submit";

  return (
    <>
      {rest.errorMessage ? <span>{rest.errorMessage}</span> : undefined}
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={values => {
          const imageFields = fieldParams ? fieldParams.imageFields : undefined;
          onPost(values, imageFields);
        }}
      >
        {({ handleSubmit, isSubmitting, ...formikBag }) => {
          return (
            <form onSubmit={handleSubmit}>
              <AnyInputElement formParams={formParams} formikBag={formikBag} />
              {imageParams ? <FormImageViewer {...imageParams} /> : undefined}
              {fieldParams ? <InputTagForImage {...fieldParams} /> : undefined}
              <Button type="submit" disabled={isSubmitting}>
                {buttonChildren}
              </Button>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default CustomForm;
