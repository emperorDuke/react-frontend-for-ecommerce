import React from "react";
import useSelector from "../redux/utils/useStoreSelector";
import { productEnhancer, useProduct, EnhancedProductType } from "./product";
import { useDispatch } from "react-redux";
import { extendProducts } from "../redux/actionCreators/ProductActions";
import { useMemoCompare, useDidUpdateEffect } from "../utils";

type EnhancedListing = {
	[key: string]: EnhancedProductType[];
};

export function useListings() {
	const incomingListings = useSelector(({ listings }) => listings.listings);
	const dispatch = useDispatch();
	const product = useProduct();

	const mappedListings = React.useMemo(() => {
		const enhancedListings = incomingListings.map((listing) => {
			let enhancedListing: EnhancedListing = {};

			Object.keys(listing).forEach((key) => {
				const products = listing[key].map((listingProduct) => {
					const ok = product.get(listingProduct.id);
					if (ok) return ok;
					else return productEnhancer([listingProduct])[0];
				});

				enhancedListing[key] = products;
			});

			return enhancedListing;
		});

		return enhancedListings;
	}, [product]);

	const [listings, setListings] = React.useState(mappedListings);

	useDidUpdateEffect(() => {
		setListings(mappedListings);
	}, [mappedListings]);

	React.useEffect(() => {
		const products = incomingListings
			.map((listing) =>
				Object.keys(listing)
					.map((key) => listing[key])
					.flat()
			)
			.flat();
		dispatch(extendProducts(products));
	}, [incomingListings]);

	const all = React.useCallback(() => listings, [listings]);

	return useMemoCompare({
		all,
	});
}
