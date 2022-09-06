import { ADD_TRANSLATION_TO_HISTORY, CLEAR_TRANSLATION_HISTORY } from "../actionTypes";

const initialState = {
  historyTranslations: JSON.parse(localStorage.getItem("historyTranslations")) || [],
};

const reducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_TRANSLATION_TO_HISTORY:
      const newAddState = {
        ...state,
        historyTranslations: [action.payload, ...state.historyTranslations],
      };

      localStorage.setItem(
        "historyTranslations",
        JSON.stringify(newAddState.historyTranslations)
      );

      return newAddState;

    case CLEAR_TRANSLATION_HISTORY:
      const newRemoveState = {
        ...state,
        historyTranslations: [],
      };

      localStorage.setItem(
        "historyTranslations",
        JSON.stringify(newRemoveState.historyTranslations)
      );

      return newRemoveState;

    default:
      return state;
  }
};

export default reducer;