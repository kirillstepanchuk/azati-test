import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, createStyles } from "@mui/styles";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import SyncIcon from "@mui/icons-material/Sync";
import {
  Checkbox,
  Skeleton,
  IconButton,
  Typography,
  Grid,
  TextField,
} from "@mui/material";

import useDebounce from "../../hooks/useDebounce";
import Container from "../../components/Container";
import LanguageAutocomplete from "./LanguageAutocomplete";
import getLanguages from "../../store/actions/languageActions/getLanguages";
import detectLanguage from "../../store/actions/languageActions/detectLanguages";
import translateText from "../../store/actions/translationActions/translateText";
import addTranslationToFavorites from "../../store/actions/favoritesActions/addTranslationToFavorites";
import addTranslationToHistory from "../../store/actions/historyActions/addTranslationToHistory";
import removeTranslationFromFavorites from "../../store/actions/favoritesActions/removeTranslationFromFavorites";
import isFavoriteTranslationExists from "../../utils/isFavoriteTranslationExists";
import getStringWithoutLineBreaks from "../../utils/getStringWithoutLinebreaks";
import findLanguage from "../../utils/findLanguage";
import {
  DETECT_LANGUAGE,
  DEFAULT_OUTPUT_LANGUAGE,
  TRANSLATION_DELAY,
} from "../../constants";

const useStyles = makeStyles((theme) =>
  createStyles({
    mainGrid: {
      marginTop: theme.spacing(12),
    },
  })
);

const TranslatorContent = () => {
  const classes = useStyles();

  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [inputLanguage, setInputLanguage] = useState(DETECT_LANGUAGE);
  const [outputLanguage, setOutputLanguage] = useState(DEFAULT_OUTPUT_LANGUAGE);
  const [isLanguagesMatch, setIsLanguagesMatch] = useState(false);

  const dispatch = useDispatch();
  const languages = useSelector((state) => state.languages);
  const translation = useSelector((state) => state.translation);
  const detLanguage = useSelector((state) => state.detectedLanguage);

  const translationText = translation?.data?.text[0]?.translations[0]?.text;
  const detectedLanguage =
    translation?.data?.text[0]?.detectedLanguage?.language;

  const debounsedTranslate = useDebounce(inputText, TRANSLATION_DELAY);

  const translationData = {
    from: {
      language:
        inputLanguage.value === DETECT_LANGUAGE.value && detectedLanguage
          ? findLanguage(detectedLanguage)
          : inputLanguage,
      text: inputText,
    },
    to: {
      language: outputLanguage,
      text: outputText,
    },
  };

  const onInputTextChange = useCallback((event) => {
    setInputText(event.target.value);
  }, []);

  const onChangeLanguagesButtonClick = useCallback(() => {
    const temptInputLanguage = Object.assign({}, inputLanguage);
    const tempOutputLanguage = Object.assign({}, outputLanguage);

    const tempOutputText = translationText;

    setOutputLanguage(temptInputLanguage);
    setInputLanguage(tempOutputLanguage);

    setInputText(tempOutputText);
  }, [inputLanguage, outputLanguage, translation]);

  const [favoriteChecked, setFavoriteChecked] = useState(
    isFavoriteTranslationExists(translationData)
  );

  const onFavoritesButtonChange = useCallback(
    (event) => {
      if (event.target.checked && inputText) {
        dispatch(addTranslationToFavorites(translationData));
      } else if (!event.target.checked) {
        dispatch(removeTranslationFromFavorites(translationData));
      }
      setFavoriteChecked(isFavoriteTranslationExists(translationData));
    },
    [debounsedTranslate, translationData]
  );

  useEffect(() => {
    const textWithoutLineBreaks = getStringWithoutLineBreaks(inputText);

    const fromLanguage =
      inputLanguage.value === DETECT_LANGUAGE.value ? "" : inputLanguage.value;

    dispatch(
      translateText(textWithoutLineBreaks, fromLanguage, outputLanguage.value)
    );
  }, [debounsedTranslate, inputLanguage.label, outputLanguage.label]);

  useEffect(() => {
    if (inputLanguage.value !== DETECT_LANGUAGE.value) {
      dispatch(detectLanguage(inputText));

      if (detLanguage?.data?.language[0]?.language) {
        setIsLanguagesMatch(
          inputLanguage.value !== detLanguage?.data?.language[0]?.language
        );
      }
    }
  }, [outputText, detLanguage?.data?.language[0]?.language]);

  useEffect(() => {
    setFavoriteChecked(isFavoriteTranslationExists(translationData));
  }, [outputText]);

  useEffect(() => {
    setOutputText(translationText);
  }, [translationText]);

  useEffect(() => {
    if (outputText && inputText) {
      dispatch(addTranslationToHistory(translationData));
    }
  }, [outputText]);

  useEffect(() => {
    dispatch(getLanguages());
    setOutputText("");
  }, []);

  const possibleLanguages = languages.data?.languages || [];
  const languagesWidthDetect = [DETECT_LANGUAGE, ...possibleLanguages];

  return (
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

            <Grid item>
              {isLanguagesMatch && (
                <Typography>
                  Perhaps you need to change the keyboard layout or input
                  language
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={2}>
          <Grid
            container
            direction={{ xs: "row", md: "column" }}
            alignItems="center"
            justifyContent="center"
          >
            <IconButton
              disabled={inputLanguage.value === DETECT_LANGUAGE.value}
              color="headerLink"
              onClick={onChangeLanguagesButtonClick}
            >
              <SyncIcon />
            </IconButton>

            <Checkbox
              disabled={translation?.loading || inputText === ""}
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
              {translation.loading ? (
                <Skeleton variant="rounded" width="100%" height={137} />
              ) : (
                <TextField
                  className={classes.textarea}
                  fullWidth
                  multiline
                  minRows={4}
                  value={outputText || ""}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TranslatorContent;
