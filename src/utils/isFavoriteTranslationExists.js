const isFavoriteTranslationExists = (translation) => {
  const favoriteTranslations = localStorage.getItem("favoritesTranslations") || [];

  return favoriteTranslations.includes(JSON.stringify(translation))
}

export default isFavoriteTranslationExists;