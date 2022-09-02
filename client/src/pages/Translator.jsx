import React, { useEffect, useLayoutEffect, useState } from "react";
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

const useStyles = makeStyles((theme) =>
  createStyles({
    mainGrid: {},
  })
);

const Translator = () => {
  const classes = useStyles();

  const [value, setValue] = useState("");

  const [inputLanguage, setInputLanguage] = useState({
    label: "Detect language",
    value: "detect",
  });
  const [outputLanguage, setOutputLanguage] = useState({
    label: "English",
    value: "en",
  });

  const dispatch = useDispatch();
  const languages = useSelector((state) => state.languages);
  const detectedLanguage = useSelector((state) => state.detectedLanguage);
  const translation = useSelector((state) => state.translation);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const translationData = {
    from: {
      language: inputLanguage,
      text: value,
    },
    to: {
      language: outputLanguage,
      text: translation?.data?.text[0].translations[0].text,
    },
  };

  const [favoriteChecked, setFavoriteChecked] = useState(
    isFavoriteTranslationExists(translationData)
  );

  const onFavoritesButtonChange = (event) => {
    if (event.target.checked && value) {
      dispatch(addTranslationToFavorites(translationData));
    } else if (!event.target.checked) {
      dispatch(removeTranslationFromFavorites(translationData));
    }
    setFavoriteChecked(isFavoriteTranslationExists(translationData));
  };

  const debounsedTranslate = useDebounce(value, 500);

  useLayoutEffect(() => {
    if (inputLanguage.value === "detect") {
      dispatch(detectLanguage(value));

      const inputLng = detectedLanguage?.data?.language[0].language;

      dispatch(translateText(value, inputLng, outputLanguage.value));
    } else {
      dispatch(translateText(value, inputLanguage.value, outputLanguage.value));
    }

    setFavoriteChecked(isFavoriteTranslationExists(translationData));
  }, [
    debounsedTranslate,
    detectedLanguage?.data?.language[0].language,
    translation?.data?.text[0].translations[0].text,
  ]);

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const possibleLanguages = languages.data?.languages || [];
  const languagesWidthDetect = [
    {
      label: "Detect language",
      value: "detect",
    },
    ...possibleLanguages,
  ];

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
                  value={value}
                  onChange={handleChange}
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
                  <Skeleton width="100%" />
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
