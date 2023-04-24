export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const DELETECART = 'DELETECART';



export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const increment = (id) => ({
    type: INCREMENT,
    payload: id,
  });

  export const decrement = (id) => ({
    type: DECREMENT,
    payload: id,
  });

  export const deleteCart = (id) => ({
    type: DELETECART,
    payload: id,
  });
