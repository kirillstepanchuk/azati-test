import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, createStyles } from "@mui/styles";
import { Skeleton, Typography, Grid, TextField } from "@mui/material";

import SwitchLanguages from "./SwitchLanguages";
import AddToFavoriteButton from "./AddToFavoriteButton";
import Container from "../../components/Container";
import LanguageAutocomplete from "./LanguageAutocomplete";
import getLanguages from "../../store/actions/languageActions/getLanguages";
import detectLanguage from "../../store/actions/languageActions/detectLanguages";
import translateText from "../../store/actions/translationActions/translateText";
import addTranslationToHistory from "../../store/actions/historyActions/addTranslationToHistory";
import getStringWithoutLineBreaks from "../../utils/getStringWithoutLinebreaks";
import findLanguage from "../../utils/findLanguage";
import useDebounce from "../../hooks/useDebounce";
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
  const detectedLanguage = useSelector((state) => state.detectedLanguage);

  const translationText = translation?.data?.text[0]?.translations[0]?.text;
  const detectedLanguageValue = detectedLanguage?.data?.language[0]?.language;
  const detectedLanguageFromTranslate =
    translation?.data?.text[0]?.detectedLanguage?.language;

  const debounsedTranslate = useDebounce(inputText, TRANSLATION_DELAY);

  const translationData = {
    from: {
      language:
        inputLanguage.value === DETECT_LANGUAGE.value &&
        detectedLanguageFromTranslate
          ? findLanguage(detectedLanguageFromTranslate)
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

      if (detectedLanguageValue) {
        setIsLanguagesMatch(inputLanguage.value !== detectedLanguageValue);
      }
    }
  }, [outputText, detectedLanguageValue]);

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
            <SwitchLanguages
              inputLanguage={inputLanguage}
              setInputLanguage={setInputLanguage}
              outputLanguage={outputLanguage}
              setOutputLanguage={setOutputLanguage}
              setInputText={setInputText}
              translationText={translationText}
            />

            <AddToFavoriteButton
              inputValue={debounsedTranslate}
              translationData={translationData}
              loading={translation.loading}
              inputTex={inputText}
              outputText={outputText}
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
