import React from 'react';
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { CustomInputProps, BootstrappedInput } from '../CustomInputHtml';
import { FormikProps } from 'formik';
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";




const useStyles = makeStyles((theme: Theme) => createStyles({
    select:{
        width: "inherit",
        boxSizing: "border-box",
        '&:focus':{
            backgroundColor: theme.palette.background.paper
        }
    },
    menuProps:{
        fontSize: theme.typography.fontSize,
    }
}));
 

export interface CustomSelectProps extends CustomInputProps {
    selectItems: Array<{item: string, svg?: string}>
}

type Props = CustomSelectProps & Pick<FormikProps<{[key:string]:string}>, Exclude<keyof FormikProps<{[key:string]:string}>,  
                                        "isSubmitting" | "handleSubmit"| "errors" | "touched" | "setFieldError">>;


const CustomSelect = ({selectItems, defaultValue, placeholder, field, handleBlur, handleChange, values, ...rest}:Props) => {

    const classes = useStyles();

    const props = { className: rest.className, id: rest.id };

    const value = defaultValue ? { defaultvalue: defaultValue } : { placeHolder: placeholder };

    const { placeHolder, defaultvalue } = value;

    const items = selectItems.map(( {item, svg} ) => (
                    <MenuItem 
                        value={item} 
                        className={classes.menuProps}
                    >
                        { svg ? <img src={svg} alt={item} /> : undefined }
                        {item}
                    </MenuItem>
                ));

    const option_1 = !placeHolder ? <MenuItem className={classes.menuProps} value={defaultvalue}>{defaultvalue}</MenuItem> : <MenuItem className={classes.menuProps} value='' disabled>{placeHolder}</MenuItem>


    return (
        <>
            <Select
                value={values[field]}
                onChange={handleChange}
                onBlur={handleBlur}
                name={field}
                {...props}
                input={<BootstrappedInput id={rest.id} name={field}/>}
                classes={{
                    select: classes.select
                }}
                displayEmpty
                >
                {option_1} 
                {items}
            </Select>
        </>
    )
  
}


export default CustomSelect;


