import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Checkbox } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

import addTranslationToFavorites from "../../store/actions/favoritesActions/addTranslationToFavorites";
import removeTranslationFromFavorites from "../../store/actions/favoritesActions/removeTranslationFromFavorites";
import isFavoriteTranslationExists from "../../utils/isFavoriteTranslationExists";

const AddToFavoriteButton = ({
  inputValue,
  translationData,
  loading,
  inputText,
  outputText,
}) => {
  const dispatch = useDispatch();

  const [favoriteChecked, setFavoriteChecked] = useState(
    isFavoriteTranslationExists(translationData)
  );

  const onFavoritesButtonChange = useCallback(
    (event) => {
      if (event.target.checked && inputValue) {
        dispatch(addTranslationToFavorites(translationData));
      } else if (!event.target.checked) {
        dispatch(removeTranslationFromFavorites(translationData));
      }
      setFavoriteChecked(isFavoriteTranslationExists(translationData));
    },
    [inputValue, translationData]
  );

  useEffect(() => {
    setFavoriteChecked(isFavoriteTranslationExists(translationData));
  }, [outputText]);

  return (
    <Checkbox
      disabled={loading || inputText === ""}
      checked={favoriteChecked}
      color="iconButton"
      onChange={onFavoritesButtonChange}
      icon={<StarBorderIcon />}
      checkedIcon={<StarIcon />}
    />
  );
};

export default AddToFavoriteButton;
