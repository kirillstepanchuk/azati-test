import _ from "lodash";

const isFavoriteTranslationExists = (translation) => {
  const favoriteTranslations = JSON.parse(localStorage.getItem("favoritesTranslations")) || [];

  const isExists = favoriteTranslations.filter((favoriteElement) => _.isEqual(translation, favoriteElement)).length !== 0;

  return isExists;
}

export default isFavoriteTranslationExists;
