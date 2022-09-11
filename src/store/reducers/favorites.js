import _ from "lodash";

import { ADD_TRANSLATION_TO_FAVORITES, REMOVE_TRANSLATION_FROM_FAVORITES } from "../actionTypes";

const initialState = {
  favoritesTranslations: JSON.parse(localStorage.getItem("favoritesTranslations")) || [],
};

const reducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_TRANSLATION_TO_FAVORITES:
      const newAddState = {
        ...state,
        favoritesTranslations: [action.payload.translation, ...state.favoritesTranslations],
      };

      localStorage.setItem(
        "favoritesTranslations",
        JSON.stringify(newAddState.favoritesTranslations)
      );

      return newAddState;

    case REMOVE_TRANSLATION_FROM_FAVORITES:

      const indexOfProduct = state.favoritesTranslations.findIndex((object) => _.isEqual(object, action.payload.translation));

      if (indexOfProduct === -1) {
        return state;
      }

      state.favoritesTranslations.splice(indexOfProduct, 1);

      const newRemoveState = {
        ...state,
        favoritesTranslations: [...state.favoritesTranslations],
      };

      localStorage.setItem(
        "favoritesTranslations",
        JSON.stringify(newRemoveState.favoritesTranslations)
      );

      return newRemoveState;

    default:
      return state;
  }
};

export default reducer;