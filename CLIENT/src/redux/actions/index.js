import axios from "axios";
import {
  GET_PRODUCTS,
  GET_PRODUCT_DETAIL,
  EMPTY_DETAIL,
  GET_SIZES,
  ORDER_PRODUCTS_BY_NAME,
  FILTER_PRODUCTS,
  LOGIN_USER,
  GET_PRODUCTS_CART,
  CREATE_USER,
  CREATE_STORE,
  CREATE_PUBLICATION,
  GET_FAVORITES,
  ADD_TO_FAVORITES,
  DELETE_FAVORITE,
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
  GET_REVIEWS_PRODUCT_DETAIL,
  FLUSH_ERROR,
  GET_SELLS_HISTORY,
  GET_SELL_DETAIL,
  CREATE_REVIEW_PRODUCT,
  BUY_PRODUCT,
  CLEAR_FAVORITES,
} from "../action-types";

export const getProducts = () => {
  return async function (dispatch) {
    const products = await axios.get("/product/all");
    dispatch({
      type: GET_PRODUCTS,
      payload: products.data,
    });
  };
};

export const getProductDetail = (id) => {
  return async function (dispatch) {
    const detail = await axios.get(`/product/${id}`);
    dispatch({
      type: GET_PRODUCT_DETAIL,
      payload: detail.data,
    });
  };
};

export const getProductDetailReviews = (id) => {
  return async function (dispatch) {
    const reviews = await axios.get(`/product/review/${id}`);
    dispatch({
      type: GET_REVIEWS_PRODUCT_DETAIL,
      payload: reviews.data,
    });
  };
};

export const emptyDetail = () => {
  return {
    type: EMPTY_DETAIL,
  };
};

export const getSizes = () => {
  return async function (dispatch) {
    const sizes = await axios.get(`/sizes`);
    dispatch({
      type: GET_SIZES,
      payload: sizes.data,
    });
  };
};

export const orderProductsByName = (data) => {
  return {
    type: ORDER_PRODUCTS_BY_NAME,
    payload: data,
  };
};

export const filterProducts = (
  name,
  price,
  size,
  demographic,
  color,
  page,
  orderBy,
  sortBy
) => {
  return async function (dispatch) {
    const filteredProducts = await axios.get(
      `/product/filter?name=${name}&price=${price}&size=${size}&demographic=${demographic}&color=${color}&page=${page}&sortBy=${sortBy}&orderBy=${orderBy}`
    );
    dispatch({
      type: FILTER_PRODUCTS,
      payload: filteredProducts.data,
    });
  };
};

export const loginUser = (userInfo) => {
  return async function (dispatch) {
    axios.post("/login", userInfo).then(
      function ({ data }) {
        dispatch({
          type: LOGIN_USER,
          payload: null,
        });
        sessionStorage.setItem("sessionData", JSON.stringify(data));
      },
      function (err) {
        dispatch({
          type: LOGIN_USER,
          payload: err.response.data,
        });
      }
    );
  };
};

export const createUser = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/user`, data);
      return dispatch({
        type: CREATE_USER,
        payload: res.data,
      });
    } catch (error) {
      alert(error);
    }
  };
};
export const createStore = (token, data) => {
  return async (dispatch) => {
    const res = await axios.patch(`/user?secret_token=${token}`, data);
    return dispatch({
      type: CREATE_STORE,
      payload: res.data,
    });
  };
};

export const createPublication = () => {
  return async (dispatch) => {
    const res = await axios.post(`/publication`);
    return dispatch({
      type: CREATE_PUBLICATION,
      payload: res.data,
    });
  };
};

export const getFavorites = (id, token) => {
  return async (dispatch) => {
    const res = await axios.get(
      `/user/favorites?profileID=${id}&secret_token=${token}`
    );
    return dispatch({
      type: GET_FAVORITES,
      payload: res.data,
    });
  };
};

export const addToFavorites = (id, profileId, token) => {
  return async (dispatch) => {
    await axios.put(
      `/user/favorites?productID=${id}&profileID=${profileId}&secret_token=${token}`
    );
    return dispatch({
      type: ADD_TO_FAVORITES,
      payload: id,
    });
  };
};

export const deleteFavorite = (productId, profileId, token) => {
  return async (dispatch) => {
    await axios.delete(
      `/user/favorites?productID=${productId}&profileID=${profileId}&secret_token=${token}`
    );
    return dispatch({
      type: DELETE_FAVORITE,
      payload: productId,
    });
  };
};

export const addToCart = (id, profileId, token) => {
  return async (dispatch) => {
    const res = await axios.put(
      `/user/shoppingcart?productID=${id}&profileID=${profileId}&secret_token=${token}`
    );
    return dispatch({
      type: ADD_TO_CART,
      payload: res,
    });
  };
};

export const getCartProducts = (id, token) => {
  return async (dispatch) => {
    const res = await axios.get(
      `/user/shoppingcart?profileID=${id}&secret_token=${token}`
    );
    return dispatch({
      type: GET_PRODUCTS_CART,
      payload: res.data,
    });
  };
};
export const delProductCart = (productId, profileId, token) => {
  return async (dispatch) => {
    const res = await axios.delete(
      `/user/shoppingcart?productID=${productId}&profileID=${profileId}&secret_token=${token}`
    );
    return dispatch({
      type: REMOVE_ONE_FROM_CART,
      payload: res,
    });
  };
};

export const delFromCart = (id, all = false) =>
  all
    ? { type: REMOVE_ALL_FROM_CART, payload: id }
    : { type: REMOVE_ONE_FROM_CART, payload: id };

export const clearCart = (profileId, token) => {
  return async (dispatch) => {
    await axios.delete(
      `/user/shoppingcart?&profileID=${profileId}&secret_token=${token}`
    );
    return dispatch({
      type: CLEAR_CART,
    });
  };
};

export const clearFavorites = (profileId, token) => {
  return async (dispatch) => {
    await axios.delete(
      `/user/favorites?&profileID=${profileId}&secret_token=${token}`
    );
    return dispatch({
      type: CLEAR_FAVORITES,
    });
  };
};

export const flushError = () => {
  return async (dispatch) => {
    dispatch({
      type: FLUSH_ERROR,
      payload: null,
    });
  };
};

export const getSellsHistory = () => {
  return async (dispatch) => {
    const history = await axios.get("/sellsHistory");
    dispatch({
      type: GET_SELLS_HISTORY,
      payload: history.data,
    });
  };
};

export const getSellDetail = (idSell) => {
  return async (dispatch) => {
    const sellDetail = await axios.get(`/sell/${idSell}`);
    dispatch({
      type: GET_SELL_DETAIL,
      payload: sellDetail.data,
    });
  };
};

export const createReviewProduct = (id, data, token) => {
  return async (dispatch) => {
    const res = await axios.post(
      `/product/review/${id}&secret_token=${token}`,
      data
    );
    dispatch({
      type: CREATE_REVIEW_PRODUCT,
      payload: res.data,
    });
  };
};

export const buyProduct = (data) => {
  return async function (dispatch) {
    const link = await axios.post(`/generar`, data);
    dispatch({
      type: BUY_PRODUCT,
      payload: link.data,
    });
  };
};
