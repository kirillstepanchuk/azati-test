import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { nanoid } from "nanoid";

import FavoriteItem from "./FavoriteItem";
import Container from "../../components/Container";
import removeTranslationFromFavorites from "../../store/actions/favoritesActions/removeTranslationFromFavorites";

const useStyles = makeStyles((theme) =>
  createStyles({
    mainContainer: {
      paddingTop: theme.spacing(12),
    },
  })
);

const FavoriteList = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { favoritesTranslations } = useSelector((state) => state.favorites);

  const onDeleteButtonClick = (translationData) => {
    return () => {
      dispatch(removeTranslationFromFavorites(translationData));
    };
  };

  return (
    <Container>
      <Grid
        className={classes.mainContainer}
        container
        spacing={4}
        direction="column"
        justifyContent="center"
      >
        {favoritesTranslations.length ? (
          favoritesTranslations.map((favoriteElement) => (
            <FavoriteItem
              translation={favoriteElement}
              onDeleteButtonClick={onDeleteButtonClick}
              key={nanoid()}
            />
          ))
        ) : (
          <Grid item>
            <Grid container justifyContent="center">
              <Typography>
                You don't have favorite translations yet, click on the star to
                add!
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default FavoriteList;
