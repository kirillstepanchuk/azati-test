import { ADD_TRANSLATION_TO_FAVORITES } from "../../actionTypes";

const addTranslationToFavorites = (transaltion) => ({
  type: ADD_TRANSLATION_TO_FAVORITES,
  payload: {
    transaltion,
  }
});

export default addTranslationToFavorites;