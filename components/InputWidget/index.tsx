import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { BootstrappedInput } from '../CustomForms/CustomInputHtml';
import useStyles from "./styles";
import { InputWidgetProps } from './@types';




const InputWithQtyControl:React.ComponentType<InputWidgetProps> = ({quantity, onChange, index}) => {

    const classes = useStyles();

    return (
        <>
            <BootstrappedInput
                type='text'
                id='quantity' 
                value={quantity}
                onChange={e => onChange(Number(e.target.value), index)}
                className={classes.qtyInput}
                readOnly={Boolean(quantity >= 10)}
                inputProps={{
                    className: classes.input
                }}
                startAdornment={
                    <InputAdornment position='start'>
                        <IconButton 
                            onClick={() => onChange(--quantity, index)}
                            disabled={Boolean(quantity <= 1)}
                            className={classes.leftQtyBtn}
                        >
                            -
                        </IconButton>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton 
                            onClick={() => onChange(++quantity, index)}
                            className={classes.rightQtyBtn}
                            disabled={Boolean(quantity >= 10)}
                        >
                            +
                        </IconButton>
                    </InputAdornment>
                    } 
            />
        </>
    );
}

export default InputWithQtyControl;