import { ADD_TRANSLATION_TO_FAVORITES } from "../../actionTypes";

const addTranslationToFavorites = (translation) => ({
  type: ADD_TRANSLATION_TO_FAVORITES,
  payload: {
    translation,
  }
});

export default addTranslationToFavorites;