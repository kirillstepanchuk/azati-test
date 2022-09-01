import { REMOVE_TRANSLATION_FROM_FAVORITES } from "../../actionTypes";

const removeTranslationFromFavorites = (transaltion) => ({
  type: REMOVE_TRANSLATION_FROM_FAVORITES,
  payload: {
    transaltion,
  }
});

export default removeTranslationFromFavorites;