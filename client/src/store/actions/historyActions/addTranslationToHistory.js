import { ADD_TRANSLATION_TO_HISTORY } from "../../actionTypes";

const addTranslationToHistory = (translation) => ({
  type: ADD_TRANSLATION_TO_HISTORY,
  payload: {
    translation,
  }
});

export default addTranslationToHistory;