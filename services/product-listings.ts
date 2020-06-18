import React from "react";
import useSelector from "../redux/utils/useStoreSelector";
import { productEnhancer, useProduct, EnhancedProductType } from "./product";
import { useDispatch } from "react-redux";
import { extendProducts } from "../redux/actionCreators/ProductActions";

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

        Object.defineProperty(enhancedListing, key, {
          value: products,
          enumerable: true,
        });
      });

      return enhancedListing;
    });

    return enhancedListings;
  }, [product.all()]);

  const [lisitings, setListings] = React.useState(mappedListings);

  React.useEffect(() => {
    setListings(mappedListings);
  }, [mappedListings]);

  React.useEffect(() => {
    const products = incomingListings.flatMap((listing) =>
      Object.keys(listing).flatMap((key) => listing[key])
    );
    dispatch(extendProducts(products));
  }, [incomingListings]);

  const all = () => lisitings;

  return { all };
}
