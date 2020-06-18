import React from "react";
import { BehaviorSubject } from "rxjs";
import { useSelector } from "react-redux";
import { RootStoreState as IState } from "../redux/reducers/RootReducer";
import { ProductType } from "../redux/actionCreators/ProductActions";
import { toInt } from "../utils/toInt";
import { useMemoCompare } from "../utils/useMemoCompare";

export type EnhancedProductType = ProductType & {
  link?: string;
  href?: string;
  as?: string;
  inCart?: boolean;
  price: number;
  discount: number;
  percentageOff?: string;
};

export type ProductEnhancerType = (
  products: Array<ProductType>,
  productsInCart?: Array<number>
) => Array<EnhancedProductType>;

export type SortFnType<T = EnhancedProductType> = (
  cmpFn: (a: T, b: T) => number
) => void;

export type FnType<T = void> = (id: number) => T;

const products$ = new BehaviorSubject<Array<EnhancedProductType>>([]);

const getPercentageOff = (discount: number, price: number) => {
  return Math.round(100 - ((discount / price) * 100) / 1);
};

export const productEnhancer: ProductEnhancerType = (products, itemsInCart) => {
  const setInCart = (product: ProductType) => {
    if (itemsInCart && product.id && itemsInCart.includes(product.id)) {
      return true;
    }

    return false;
  };

  return products.map((product) => {
    let discount = Number(product.discount);
    let price = Number(product.price);

    return {
      ...product,
      price: price,
      discount: discount,
      link: `/p/${product.name}?track_id=${product.id}`,
      href: `/p/[slug]`,
      as: `/p/${product.name}?track_id=${product.id}`,
      inCart: setInCart(product),
      percentageOff: `${getPercentageOff(discount, price)}% off`,
    };
  });
};

/**
 * Get products from store and provide utility functions
 */
export function useProduct() {
  const incomingProducts = useSelector(
    ({ products }: IState) => products.products
  );

  const incomingAttributes = useSelector(
    ({ attributes }: IState) => attributes.attributes
  );

  const incomingMeta = useSelector(
    ({ productMetas }: IState) => productMetas.productMeta
  );

  const productsInCart = React.useRef<Array<number>>([]);

  const enhancedProduct = React.useMemo(
    () => productEnhancer(incomingProducts, productsInCart.current),
    [incomingProducts]
  );

  const [products, setProducts] = React.useState(enhancedProduct);

  React.useEffect(() => {
    products$.next(enhancedProduct);
  }, [incomingProducts]);

  React.useEffect(() => {
    products$.subscribe((val) => setProducts(val));

    return () => products$.unsubscribe();
  }, []);

  /**
   *
   * @param cmpFn sorts the products
   */
  const sort: SortFnType = React.useCallback(
    (cmpFn) => {
      products$.next(products.sort(cmpFn));
    },
    [products]
  );

  const setInCart: FnType = React.useCallback(
    (id) => {
      productsInCart.current = [...productsInCart.current, id];
      products$.next(
        products.map((product) => {
          if (product.id === id) product["inCart"] = true;
          return product;
        })
      );
    },
    [productsInCart.current, products]
  );

  const unsetInCart: FnType = React.useCallback(
    (id) => {
      productsInCart.current = productsInCart.current.filter(
        (CartId) => CartId !== id
      );
      products$.next(
        products.map((product) => {
          if (product.id === id) product["inCart"] = false;
          return product;
        })
      );
    },
    [productsInCart.current, products]
  );

  /**
   *
   * @param id gets a particular product
   */
  const get = React.useCallback(
    (id?: number | string) => {
      return products.find((product) => product.id === toInt(id));
    },
    [products]
  );

  /**
   *
   * @param id get images attached with product
   */
  const getAttachments = React.useCallback(
    (id?: number | string) => {
      const attachment_re = /attachments_/i;
      const product = get(toInt(id));

      if (product) {
        return Object.keys(product)
          .filter((key) => attachment_re.test(key))
          .map((key) => product[key] as string);
      }
    },
    [products]
  );

  const getAttributes = React.useCallback(
    (id?: number) => {
      const product = get(toInt(id));
      if (product) {
        return incomingAttributes.filter(
          (attribute) => attribute.product === product.id
        );
      }
    },
    [incomingAttributes]
  );

  const getKeyfeatures = React.useCallback(() => incomingMeta.key_features, [
    incomingMeta.key_features,
  ]);

  const getSpecifications = React.useCallback(
    () => incomingMeta.specification,
    [incomingMeta.specification]
  );

  const all = React.useCallback(() => products, [products]);

  const productUtils = useMemoCompare({
    sort,
    setInCart,
    unsetInCart,
    getAttachments,
    get,
    getAttributes,
    all,
    getKeyfeatures,
    getSpecifications,
  });

  return productUtils;

}
