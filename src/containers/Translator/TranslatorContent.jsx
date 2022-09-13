import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, createStyles } from "@mui/styles";
import { Skeleton, Grid, TextField } from "@mui/material";

import SwitchLanguages from "./SwitchLanguages";
import AddToFavoriteButton from "./AddToFavoriteButton";
import WrongLanguageMessage from "./WrongLanguageMessage";
import LanguageAutocomplete from "./LanguageAutocomplete";
import Container from "../../components/Container";
import {
  selectLanguagesState,
  selectTranslationState,
} from "../../store/selectors";
import getLanguages from "../../store/actions/languageActions/getLanguages";
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

  const dispatch = useDispatch();
  const languages = useSelector(selectLanguagesState);
  const translation = useSelector(selectTranslationState);

  const translationText = translation?.data?.text[0]?.translations[0]?.text;
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
              <WrongLanguageMessage
                inputLanguage={inputLanguage}
                inputText={inputText}
                outputText={outputText}
              />
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
              inputText={inputText}
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
