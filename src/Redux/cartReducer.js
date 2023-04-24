import { ADD_TO_CART, DECREMENT, DELETECART, INCREMENT } from "../Redux/cartAction";

const initialState = {
  cartItems: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const findData = state.cartItems?.find(
        (item) => item?.id === action.payload.id
      );
      if (!findData) {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      } else {
        const findIndex = state.cartItems?.findIndex(
          (item) => item.id === action.payload.id
        );
        let newdata = [...state.cartItems];
        newdata[findIndex] = {
          ...newdata[findIndex],
          count: (newdata[findIndex].count += 1),
        };
        return {
          ...state,
          cartItems: newdata,
        };
      }

    case INCREMENT: {
      const findID = state.cartItems?.findIndex(
        (item) => item?.id === action.payload.id
      );
      let newData = [...state.cartItems];
      newData[findID] = {
        ...newData[findID],
        count: (newData[findID].count += 1),
      };
      return {
        ...state,
        cartItems: newData,
      };
    }
    case DECREMENT: {
      const findID = state.cartItems?.findIndex(
        (item) => item?.id === action.payload.id
      );
      let newData = [...state.cartItems];
      if(newData[findID].count>1){
      newData[findID] = {
        ...newData[findID],
        count: (newData[findID].count -= 1),
      };
    }
      return {
        ...state,
        cartItems: newData,
      };
    }
    case DELETECART: {
        const filterData = state.cartItems?.filter(
          (item) => item?.id !== action.payload.id
        );
        
        return {
          ...state,
          cartItems: filterData,
        };
      }
    default:
      return state;
  }
}
