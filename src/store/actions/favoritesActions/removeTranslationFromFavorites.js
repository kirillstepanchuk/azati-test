import { REMOVE_TRANSLATION_FROM_FAVORITES } from "../../actionTypes";

const removeTranslationFromFavorites = (translation) => ({
  type: REMOVE_TRANSLATION_FROM_FAVORITES,
  payload: {
    translation,
  }
});

export default removeTranslationFromFavorites;