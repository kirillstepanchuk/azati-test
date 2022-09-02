import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";

import Container from "../components/Container/Container";
import Header from "../components/Header/Header";
import removeTranslationFromFavorites from "../store/actions/favoritesActions/removeTranslationFromFavorites";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const onDeleteButtonClick = (tr) => {
    return () => {
      dispatch(removeTranslationFromFavorites(tr));
    };
  };

  return (
    <div>
      <Header />
      <Container>
        <Grid container spacing={4}>
          {favorites?.favoritesTranslations.map((tr, index) => (
            <Grid key={index} item xs={12}>
              {tr.transaltion.from.text} {tr.transaltion.to.text}
              <button onClick={onDeleteButtonClick(tr)}>Удалить</button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Favorites;
