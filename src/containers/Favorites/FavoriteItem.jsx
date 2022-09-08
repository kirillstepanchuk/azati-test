import React from "react";
import { Grid, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const FavoriteItem = ({ translation, onDeleteButtonClick }) => {
  return (
    <Grid item xs={12}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={5.5}>
          <Grid container justifyContent="flex-end" alignItems="center">
            <Typography>{translation.from.language.label}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container justifyContent="center" alignItems="center">
            <ArrowForwardIcon fontSize="small" />
          </Grid>
        </Grid>
        <Grid item xs={5.5}>
          <Grid container justifyContent="flex-start" alignItems="center">
            <Typography>{translation.to.language.label}</Typography>
            <IconButton onClick={onDeleteButtonClick(translation)}>
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
            <Typography>{translation.from.text}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={5.5}>
          <Grid container justifyContent="flex-start">
            <Typography>{translation.to.text}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FavoriteItem;
