
const API_URL = "http://127.0.0.1:8000";

export const urls = {
  postAttributes: `${API_URL}/products/attributes/`,
  getAttributes: (productID: string | number) => `${API_URL}/products/${productID}/attributes/`,
  updateAttributes: (attributeID: string) => `${API_URL}/products/attributes/${attributeID}/`,
  products: `${API_URL}/products/`,
  getProduct: (productID: number | string) => `${API_URL}/products/${productID}/`,
  getMetas: (productID: string) => `${API_URL}/products/${productID}/meta/s/`,
  postMetas: `${API_URL}/products/meta/`,
  merchantStores: `${API_URL}/stores/`,
  merchantStoresLocations: `${API_URL}/stores/locations/`,
  internalAds: `${API_URL}/admin-adverts/`,
  updateMetas: (productID: string) => `${API_URL}/products/${productID}/meta/`,
  getMerchantStore: (storeID: string | number) => `${API_URL}/stores/${storeID}/`,
  postCart: `${API_URL}/cart/`,
  getCarts: `${API_URL}/cart/`,
  updateCart: (cartID?: number) => `${API_URL}/cart/${cartID}/`,
  getOrder: (orderID?: number | string) => `${API_URL}/order/${orderID}/`,
  orders: `${API_URL}/order/`,
  getUser: (userID?: number | string) => `${API_URL}/users/${userID}/`,
  getPickupLocation: `${API_URL}/location/`,
  addressBook: `${API_URL}/buyer/users/addresses/`,
  getCategories: `${API_URL}/categories/`
};
