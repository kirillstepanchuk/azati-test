const isFavoriteTranslationExists = (translation) => {
  const favoriteTranslations = JSON.parse(localStorage.getItem("favoritesTranslations")) || [];

  const isExists = favoriteTranslations.filter((tr) => JSON.stringify(translation) === JSON.stringify(tr)).length !== 0;

  return isExists;
}

export default isFavoriteTranslationExists;
