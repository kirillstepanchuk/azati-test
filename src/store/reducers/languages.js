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
