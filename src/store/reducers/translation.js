import { TRANSLATE_TEXT, TRANSLATE_TEXT_SUCCESS, TRANSLATE_TEXT_ERROR } from "../actionTypes";

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
    case TRANSLATE_TEXT:
      return {
        ...state,
        loading: true,
      };
    case TRANSLATE_TEXT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case TRANSLATE_TEXT_ERROR:
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
