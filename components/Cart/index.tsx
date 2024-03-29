import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputWidget from "../InputWidget";
import Img from "../Img";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Link from "../Link";
import useStyles from "./styles";
import CurrencyManager from "../CurrencyManager";
import { CartProps } from "./@types";
import { sum } from "./utils";
import { useProduct, useMerchantStore } from "../../services";

export * from "./@types";
export * from "./utils";
export * from "./styles";

const LABELS = [
	{ id: "img", label: "Item" },
	{ id: "name", label: " " },
	{ id: "variant", label: "Variants" },
	{ id: "qty", label: "Quantity" },
	{ id: "subtotal-price", label: "Sub Total" },
];

const Cart: React.ComponentType<CartProps> = (props) => {
	const classes = useStyles();
	const product = useProduct();
	const merchantStore = useMerchantStore();

	const tableHeadItems = LABELS.map(({ id, label }) => (
		<TableCell key={id} className={classes.font}>
			{label}
		</TableCell>
	));

	const tableBodyItems = props.cart.map((item) => {
		let tag = <React.Fragment key={item._index}></React.Fragment>;

		const _product = product.get(item.product);

		if (_product) {
			const attributes = product.getAttributes(_product.id);
			const _merchantStore = merchantStore.get(_product.store);

			tag = (
				<TableRow key={item._index}>
					<TableCell scope="row">
						<div style={{ maxWidth: "100px" }}>
							<Link href={_product.href} as={_product.as}>
								<div className={classes.imageContainer}>
									<Img
										src={_product.attachment_1}
										alt={_product.name}
										className={classes.image}
									/>
								</div>
							</Link>
						</div>
					</TableCell>
					<TableCell>
						<div style={{ maxWidth: "300px" }}>
							<Typography variant="subtitle2" gutterBottom>
								Seller: {_merchantStore && _merchantStore.name}
							</Typography>
							<Typography variant="body2" gutterBottom>
								{_product.name}
							</Typography>
							<Typography variant="caption" gutterBottom>
								This product is eligible for free shiping from Lagos within 3 working
								days
							</Typography>
							<div className={classes.variantContainer}>
								<Button
									startIcon={<DeleteIcon />}
									color="primary"
									onClick={() => props.onDelete({ _index: item._index, id: item.id })}
								>
									Remove
								</Button>
								<div className={classes.spacer} />
								<Button startIcon={<FavoriteIcon />} variant="outlined" color="primary">
									Save for later
								</Button>
							</div>
						</div>
					</TableCell>
					<TableCell>
						<div style={{ maxWidth: "150px" }}>
							{attributes && (
								<Grid container spacing={1}>
									{item.variants.map((variant) => {
										const attribute = attributes.find(
											(attribute) => variant.attribute === attribute.id
										);
										return (
											<Grid item container xs={6} key={variant.id}>
												<Grid item xs={12}>
													<Typography className={classes.font}>
														{attribute && attribute.name}:
													</Typography>
												</Grid>
												<Grid item xs={12}>
													<Tooltip
														title={
															<p className={classes.font}>
																{variant.metric_verbose_name || variant.vendor_metric}
															</p>
														}
														enterDelay={5}
														enterTouchDelay={5}
														leaveTouchDelay={80}
														leaveDelay={80}
													>
														{variant.attachment ? (
															<div className={classes.imageContainer}>
																<Link href={_product.href} as={_product.as}>
																	<Img
																		src={variant.attachment}
																		alt={variant.vendor_metric}
																		className={classes.wrapper}
																	/>
																</Link>
															</div>
														) : (
															<div className={classes.imageContainer}>
																<Link href={_product.href} as={_product.as}>
																	<div className={classes.wrapper}>
																		<Typography className={classes.font} variant="subtitle2">
																			{variant.vendor_metric}
																		</Typography>
																	</div>
																</Link>
															</div>
														)}
													</Tooltip>
												</Grid>
											</Grid>
										);
									})}
								</Grid>
							)}
						</div>
					</TableCell>
					<TableCell>
						<div style={{ maxWidth: "120px" }}>
							<InputWidget
								index={item._index}
								onChange={props.onChange}
								quantity={item.quantity}
							/>
						</div>
					</TableCell>
					<TableCell>
						<div style={{ maxWidth: "180px" }}>
							<Typography variant="subtitle2" noWrap>
								<CurrencyManager price={item.price} />
							</Typography>
						</div>
					</TableCell>
				</TableRow>
			);
		}
		return tag;
	});

	return (
		<React.Fragment>
			<div className={classes.title}>
				<Typography variant="h6"> Cart </Typography>
				<div className={classes.spacer} />
				<Typography variant="h6">
					{props.cart.length <= 1
						? `${props.cart.length} item`
						: `${props.cart.length} items`}
				</Typography>
			</div>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>{tableHeadItems}</TableHead>
					<TableBody>{tableBodyItems}</TableBody>
				</Table>
			</TableContainer>
			<Toolbar className={classes.toolbarPadding}>
				<Grid container spacing={1} direction="column">
					<Grid item>
						<Grid container spacing={1}>
							<div className={classes.bottomSpacer} />
							<Grid item>
								<Typography variant="subtitle1">Total price:</Typography>
							</Grid>
							<Grid item>
								<Typography variant="subtitle1">
									{tableBodyItems ? (
										<CurrencyManager price={sum(props.cart)} />
									) : (
										<CurrencyManager />
									)}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid container spacing={1}>
						<div className={classes.bottomSpacer} />
						<Grid item>
							<Typography variant="subtitle1">
								Shipping fee has not been included yet:
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="subtitle1">
								<CurrencyManager />
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Toolbar>
		</React.Fragment>
	);
};

export default React.memo(Cart);
