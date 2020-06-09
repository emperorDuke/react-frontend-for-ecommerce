import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Deleteicon from "@material-ui/icons/DeleteOutlined";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import { BootstrappedInput } from "../CustomInputHtml";
import useStyles from "./styles";
import { InputElementForImageProps } from "./@types";

type StateType = Array<{ key: number; ref: React.RefObject<HTMLInputElement> }>;

const InputFieldForImage: React.ComponentType<InputElementForImageProps> = ({
  imageFields,
  removeField,
  addField
}) => {
  const classes = useStyles();

  const [refs, setRefs] = useState<StateType>([]);

  useEffect(() => {
    const activeRefs = refs.filter(ref =>
      imageFields.map(field => field.key).includes(ref.key)
    );
    setRefs(activeRefs);
  }, [imageFields]);

  const handleChange = (key: number, ref: React.RefObject<any>) => () => {
    const filteredRef = refs.filter(ref => ref.key === key)[0];

    if (!filteredRef) setRefs(prevRef => [...prevRef, { key: key, ref: ref }]);
  };

  const input = imageFields.map(({ key, ref, label, ...rest }) => {
    let clonedRef = refs.filter(ref => ref.key === key)[0];
    let imageFile = clonedRef.ref.current && clonedRef.ref.current.files;

    return (
      <FormControl fullWidth key={key} className={classes.root}>
        <InputLabel className={classes.fontSize}>{label}:</InputLabel>
        <BootstrappedInput
          {...rest}
          inputRef={ref}
          onChange={handleChange(key, ref)}
          className={classes.fontSize}
          inputProps={{
            className: classes.input
          }}
        />
        <div className={classes.imageContainer}>
          {refs.length > 0 && imageFile && (
            <img
              src={window.URL.createObjectURL(imageFile[0])}
              alt="store-logo"
              className={classes.image}
            />
          )}
        </div>
        <div className={classes.btnContainer}>
          {removeField && refs.length > 0 && imageFile && (
            <IconButton
              className={classNames(classes.trashBtn, classes.fontSize)}
              onClick={() => removeField(key)}
              aria-label="delete"
            >
              <Deleteicon />
              <Typography variant="srOnly">Remove Field</Typography>
            </IconButton>
          )}
        </div>
      </FormControl>
    );
  });

  return (
    <>
      {input}
      {addField && (
        <IconButton onClick={() => addField()}>Add Image</IconButton>
      )}
    </>
  );
};

export * from "./@types";
export default InputFieldForImage;
