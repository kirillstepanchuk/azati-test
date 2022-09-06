import React from "react";
import { Grid, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const HistoryItem = ({ translation }) => {
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
            <Typography>
              {translation.translation.from.language.label}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container justifyContent="center" alignItems="center">
            <ArrowForwardIcon fontSize="small" />
          </Grid>
        </Grid>
        <Grid item xs={5.5}>
          <Grid container justifyContent="flex-start" alignItems="center">
            <Typography>{translation.translation.to.language.label}</Typography>
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
            <Typography>{translation.translation.from.text}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={5.5}>
          <Grid container justifyContent="flex-start">
            <Typography>{translation.translation.to.text}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HistoryItem;
