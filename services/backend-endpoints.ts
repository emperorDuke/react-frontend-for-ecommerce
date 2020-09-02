const API_URL = "http://127.0.0.1:8000";

type T = number | string;

const paths = {
  postAttributes: `/products/attributes/`,
  getProductAttributes: (ID?: T) => `/products/${ID}/attributes/`,
  updateProductAttributes: (ID?: T) => `/products/attributes/${ID}/`,
  getListings: '/products/listings',
  getProducts: `/products/`,
  getProduct: (ID?: T) => `/products/${ID}/`,
  getProductMetas: (ID?: T) => `/products/${ID}/meta/s/`,
  postMetas: `/products/meta/`,
  getMerchantStores: `/stores/`,
  getMerchantStoresLocations: `/stores/locations/`,
  getInternalAds: `/admin-adverts/`,
  updateProductMetas: (ID?: T) => `/products/${ID}/meta/`,
  getMerchantStore: (ID?: T) => `/stores/${ID}/`,
  postCart: `/cart/`,
  getCarts: `/cart/`,
  updateCart: (ID?: T) => `/cart/${ID}/`,
  getOrder: (ID?: T) => `/order/${ID}/`,
  orders: `/order/`,
  getBuyer: (ID?: T) => `/buyer/users/${ID}/`,
  getPickupLocation: `/location/`,
  addressBook: `/buyer/users/addresses/`,
  getCategories: `/categories/`,
  getSponsoredStores: '/sponsored/stores/',
  getSponsoredProducts: '/sponsored/products/',
  getFilters: (ID?: T) => `/category/filters/${ID}`
};

/**
 * returns api url
 * @param key path name
 * @param params path params if any
 */
export function apiUrl(key: keyof typeof paths, params?: T) {
  const path = paths[key];

  if (typeof path === "string") {
    return API_URL + path;
  }

  return API_URL +  path(params);
}
