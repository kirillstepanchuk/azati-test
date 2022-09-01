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
        favoritesTranslations: [...state.favoritesTranslations, action.payload],
      };

      localStorage.setItem(
        "favoritesTranslations",
        JSON.stringify(newAddState.favoritesTranslations)
      );

      return newAddState;

    case REMOVE_TRANSLATION_FROM_FAVORITES:
      state.favoritesTranslations.reverse();

      const indexOfProduct = state.favoritesTranslations.findIndex((object) => JSON.stringify(object) === JSON.stringify(action.payload));

      state.favoritesTranslations.splice(indexOfProduct, 1);

      const newRemoveState = {
        ...state,
        favoritesTranslations: [...state.favoritesTranslations.reverse()],
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