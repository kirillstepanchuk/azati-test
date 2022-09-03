import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import Container from "../components/Container/Container";
import Header from "../components/Header/Header";
import removeTranslationFromFavorites from "../store/actions/favoritesActions/removeTranslationFromFavorites";

const Favorites = () => {
  const dispatch = useDispatch();
  const { favoritesTranslations } = useSelector((state) => state.favorites);

  const onDeleteButtonClick = (tr) => {
    return () => {
      dispatch(removeTranslationFromFavorites(tr));
    };
  };

  return (
    <div>
      <Header />
      <Container>
        <Grid container spacing={4} direction="column" justifyContent="center">
          {favoritesTranslations.length ? (
            favoritesTranslations.map((tr, index) => (
              <Grid key={index} item xs={12}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={5.5}>
                    <Grid
                      container
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Typography>
                        {tr.translation.from.language.label}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={1}>
                    <Grid container justifyContent="center" alignItems="center">
                      <ArrowForwardIcon fontSize="small" />
                    </Grid>
                  </Grid>
                  <Grid item xs={5.5}>
                    <Grid
                      container
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Typography>
                        {tr.translation.to.language.label}
                      </Typography>
                      <IconButton onClick={onDeleteButtonClick(tr.translation)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={5.5}>
                    <Grid container justifyContent="flex-end">
                      <Typography>{tr.translation.from.text}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={5.5}>
                    <Grid container justifyContent="flex-start">
                      <Typography>{tr.translation.to.text}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
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
    </div>
  );
};

export default Favorites;
