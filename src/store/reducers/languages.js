import { GET_LANGUAGES, GET_LANGUAGES_SUCCESS, GET_LANGUAGES_ERROR } from "../actionTypes";

const initialState = {
  data: null,
  loading: true,
  error: false,
}

const reducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    // case ADD_PRODUCT_TO_CART:
    //   const newAddState = {
    //     ...state,
    //     cartProducts: [...state.cartProducts, action.payload],
    //   };

    //   localStorage.setItem(
    //     "cartProducts",
    //     JSON.stringify(newAddState.cartProducts)
    //   );

    //   return newAddState;

    // case REMOVE_PRODUCT_FROM_CART:
    //   state.cartProducts.reverse();

    //   const indexOfProduct = state.cartProducts.findIndex((object) => JSON.stringify(object) === JSON.stringify(action.payload));

    //   state.cartProducts.splice(indexOfProduct, 1);

    //   const newRemoveState = {
    //     ...state,
    //     cartProducts: [...state.cartProducts.reverse()],
    //   };

    //   localStorage.setItem(
    //     "cartProducts",
    //     JSON.stringify(newRemoveState.cartProducts)
    //   );

    //   return newRemoveState;

    case GET_LANGUAGES:
      return {
        ...state,
        loading: true,
      };
    case GET_LANGUAGES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case GET_LANGUAGES_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
