import React from "react";
import { BehaviorSubject } from "rxjs";
import { useSelector } from "react-redux";
import { RootStoreState as IState } from "../../redux/reducers/RootReducer";
import * as T from "./@types";
import { ProductType } from "../../redux/actionCreators/ProductActions";
import { toInt } from "../../utils/toInt";

export * from "./@types";

const products$ = new BehaviorSubject<Array<T.EnhancedProductType>>([]);

const getPercentageOff = (discount: number, price: number) => {
  return Math.round(100 - ((discount / price) * 100) / 1);
};

const productEnhancer: T.ProductEnhancerType = (products, productsInCart) => {
  const setInCart = (product: ProductType) => {
    if (productsInCart && product.id && productsInCart.includes(product.id)) {
      return true;
    }

    return false;
  };

  return products.map(product => {
    return {
      ...product,
      price: Number(product.price),
      discount: Number(product.discount),
      link: `/p/${product.name}?track_id=${product.id}`,
      href: `/p/[slug]`,
      as: `/p/${product.name}?track_id=${product.id}`,
      inCart: setInCart(product),
      percentageOff: `${getPercentageOff(
        Number(product.discount),
        Number(product.price)
      )}% off`
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
    products$.subscribe(val => setProducts(val));

    return () => products$.unsubscribe();
  }, []);

  /**
   *
   * @param cmpFn sorts the products
   */
  const sort: T.SortFnType = cmpFn => {
    products$.next(products.sort(cmpFn));
  };

  const setInCart: T.FnType = id => {
    productsInCart.current = [...productsInCart.current, id];
    products$.next(
      products.map(product => {
        if (product.id === id) product["inCart"] = true;
        return product;
      })
    );
  };

  const unsetInCart: T.FnType = id => {
    productsInCart.current = productsInCart.current.filter(
      CartId => CartId !== id
    );
    products$.next(
      products.map(product => {
        if (product.id === id) product["inCart"] = false;
        return product;
      })
    );
  };

  /**
   *
   * @param id gets a particular product
   */
  const get = (id?: number | string) => {
    return products.find(product => product.id === toInt(id));
  };

  /**
   *
   * @param id get images attached with product
   */
  const getAttachments = (id?: number | string) => {
    const attachment_re = /attachments_/i;
    const product = get(toInt(id));

    if (product) {
      return Object.keys(product)
        .filter(key => attachment_re.test(key))
        .map(key => product[key] as string);
    }
  };

  const getAttributes = (id?: number) => {
    const product = get(toInt(id));
    if (product) {
      return incomingAttributes.filter(
        attribute => attribute.product === product.id
      );
    }
  };

  const getKeyfeatures = () => incomingMeta.key_features;

  const getSpecifications = () => incomingMeta.specification;

  const all = () => products;

  return {
    sort,
    setInCart,
    unsetInCart,
    getAttachments,
    get,
    getAttributes,
    all,
    getKeyfeatures,
    getSpecifications
  };
}
