import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { nanoid } from "nanoid";

import HistoryItem from "./HistoryItem";
import Container from "../../components/Container";
import { selectHistoryState } from "../../store/selectors";
import clearTranslationHistory from "../../store/actions/historyActions/clearTranslationHistory";

const useStyles = makeStyles((theme) =>
  createStyles({
    mainContainer: {
      paddingTop: theme.spacing(12),
    },
  })
);

const HistoryList = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { historyTranslations } = useSelector(selectHistoryState);

  const onClearButtonClick = () => {
    dispatch(clearTranslationHistory());
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
        {historyTranslations.length ? (
          <>
            <Button
              color="link"
              onClick={onClearButtonClick}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Clear history
            </Button>
            {historyTranslations.map((historyElement) => (
              <HistoryItem translation={historyElement} key={nanoid()} />
            ))}
          </>
        ) : (
          <Grid item>
            <Grid container justifyContent="center">
              <Typography>Your history is clear!</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default HistoryList;
