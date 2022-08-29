import { DETECT_LANGUAGE, DETECT_LANGUAGE_SUCCESS, DETECT_LANGUAGE_ERROR } from "../actionTypes";

const initialState = {
  data: null,
  loading: false,
  error: false,
}

const reducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case DETECT_LANGUAGE:
      return {
        ...state,
        loading: true,
      }
    case DETECT_LANGUAGE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: true,
      }
    case DETECT_LANGUAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      }

    default:
      return state;
  }
};

export default reducer;
