import { ADD_TRANSLATION_TO_HISTORY } from "../../actionTypes";

const addTranslationToHistory = (transaltion) => ({
  type: ADD_TRANSLATION_TO_HISTORY,
  payload: {
    transaltion,
  }
});

export default addTranslationToHistory;