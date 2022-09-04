import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { makeStyles, createStyles } from "@mui/styles";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Checkbox, Skeleton } from "@mui/material";

import useDebounce from "../hooks/useDebounce";
import Header from "../components/Header/Header";
import Container from "../components/Container/Container";
import LanguageAutocomplete from "../components/Autocomplete/LanguageAutocomplete";
import getLanguages from "../store/actions/languageActions/getLanguages";
import detectLanguage from "../store/actions/languageActions/detectLanguages";
import translateText from "../store/actions/translationActions/translateText";
import addTranslationToFavorites from "../store/actions/favoritesActions/addTranslationToFavorites";
import removeTranslationFromFavorites from "../store/actions/favoritesActions/removeTranslationFromFavorites";
import isFavoriteTranslationExists from "../utils/isFavoriteTranslationExists";
import findLanguage from "../utils/findLanguage";
import { DETECT_LANGUAGE, DEFAULT_OUTPUT_LANGUAGE } from "../constants";

const useStyles = makeStyles((theme) =>
  createStyles({
    mainGrid: {
      marginTop: theme.spacing(12),
    },
  })
);

const Translator = () => {
  const classes = useStyles();

  const [inputText, setInputText] = useState("");
  const [inputLanguage, setInputLanguage] = useState(DETECT_LANGUAGE);
  const [outputLanguage, setOutputLanguage] = useState(DEFAULT_OUTPUT_LANGUAGE);

  const dispatch = useDispatch();
  const languages = useSelector((state) => state.languages);
  const detectedLanguage = useSelector((state) => state.detectedLanguage);
  const translation = useSelector((state) => state.translation);

  const debounsedTranslate = useDebounce(inputText, 500);

  const onInputTextChange = useCallback((event) => {
    setInputText(event.target.value);
  }, []);

  const translationData =
    inputLanguage.value === "detect" &&
    detectedLanguage?.data?.language[0].language
      ? {
          from: {
            language: findLanguage(
              detectedLanguage?.data?.language[0].language
            ),
            text: inputText,
          },
          to: {
            language: outputLanguage,
            text: translation?.data?.text[0].translations[0].text,
          },
        }
      : {
          from: {
            language: inputLanguage,
            text: inputText,
          },
          to: {
            language: outputLanguage,
            text: translation?.data?.text[0].translations[0].text,
          },
        };

  const [favoriteChecked, setFavoriteChecked] = useState(
    isFavoriteTranslationExists(translationData)
  );

  const onFavoritesButtonChange = useCallback((event) => {
    if (event.target.checked && inputText) {
      dispatch(addTranslationToFavorites(translationData));
    } else if (!event.target.checked) {
      dispatch(removeTranslationFromFavorites(translationData));
    }
    setFavoriteChecked(isFavoriteTranslationExists(translationData));
  }, []);

  useEffect(() => {
    if (inputLanguage.value === "detect") {
      dispatch(detectLanguage(inputText));

      const inputLng = detectedLanguage?.data?.language[0].language;

      dispatch(translateText(inputText, inputLng, outputLanguage.value));
    } else {
      dispatch(
        translateText(inputText, inputLanguage.value, outputLanguage.value)
      );
    }

    setFavoriteChecked(isFavoriteTranslationExists(translationData));
  }, [
    debounsedTranslate,
    inputLanguage,
    outputLanguage,
    detectedLanguage?.data?.language[0].language,
    translation?.data?.text[0].translations[0].text,
  ]);

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const possibleLanguages = languages.data?.languages || [];
  const languagesWidthDetect = [DETECT_LANGUAGE, ...possibleLanguages];

  return (
    <div>
      <Header />
      <Container>
        <Grid
          container
          direction={{ xs: "column", md: "row" }}
          columns={16}
          className={classes.mainGrid}
        >
          <Grid item xs={7}>
            <Grid container spacing={{ xs: 2, md: 3 }} direction="column">
              <Grid item>
                <LanguageAutocomplete
                  languages={languagesWidthDetect}
                  currentLanguage={inputLanguage.label}
                  setLanguage={setInputLanguage}
                  loading={languages.loading}
                />
              </Grid>

              <Grid item>
                <TextField
                  className={classes.textarea}
                  fullWidth
                  multiline
                  minRows={4}
                  value={inputText}
                  onChange={onInputTextChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Checkbox
                disabled={detectedLanguage?.loading || translation?.loading}
                checked={favoriteChecked}
                onChange={onFavoritesButtonChange}
                icon={<StarBorderIcon />}
                checkedIcon={<StarIcon />}
              />
            </Grid>
          </Grid>

          <Grid item xs={7}>
            <Grid container spacing={{ xs: 2, md: 3 }} direction="column">
              <Grid item>
                <LanguageAutocomplete
                  languages={possibleLanguages}
                  currentLanguage={outputLanguage.label}
                  setLanguage={setOutputLanguage}
                  loading={languages.loading}
                />
              </Grid>

              <Grid item>
                {translation.loading || detectedLanguage.loading ? (
                  <Skeleton variant="rounded" width="100%" height={137} />
                ) : (
                  <TextField
                    className={classes.textarea}
                    fullWidth
                    multiline
                    minRows={4}
                    value={translation.data?.text[0].translations[0].text || ""}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Translator;
