import React from "react";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { BootstrappedInput } from "../CustomForms/CustomInputHtml";
import FormControl from "@material-ui/core/FormControl";
import useStyles from "./styles";
import { InputWidgetProps } from "./@types";

const InputWithQtyControl: React.ComponentType<InputWidgetProps> = (props) => {
	const height = props.height || 30;
	const quantity = props.quantity;
	const classes = useStyles({ height });

	const handleChange = (index?: number) => (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		props.onChange(Number(e.target.value), index);
	};

	const handleClick = (qty: number, index?: number) => () => {
		props.onChange(qty, index);
	};

	return (
		<FormControl fullWidth>
			<BootstrappedInput
				type="text"
				id="quantity"
				value={quantity}
				onChange={handleChange(props.index)}
				className={classes.qtyInput}
				readOnly={quantity >= 10}
				inputProps={{
					className: classes.input,
				}}
				startAdornment={
					<InputAdornment position="start">
						<IconButton
							onClick={handleClick(quantity - 1, props.index)}
							disabled={quantity <= 1}
							className={classes.btn}
						>
							-
						</IconButton>
					</InputAdornment>
				}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							onClick={handleClick(quantity + 1, props.index)}
							className={classes.btn}
							disabled={quantity >= 10}
						>
							+
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
	);
};

export default InputWithQtyControl;
