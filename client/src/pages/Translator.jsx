import React, { useEffect, useLayoutEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import { makeStyles, createStyles } from "@mui/styles";

import { fetchTranslation } from "../api/translation.api";
import { fetchDetectedLanguage, fetchLanguages } from "../api/language.api";
import getLanguages from "../store/actions/languageActions/getLanguages";
import useDebounce from "../hooks/useDebounce";
import Header from "../components/Header/Header";
import Container from "../components/Container/Container";
import { useDispatch, useSelector } from "react-redux";
import LanguageAutocomplete from "../components/Autocomplete/LanguageAutocomplete";
import { Skeleton } from "@mui/material";
import translateText from "../store/actions/translationActions/translateText";
import detectLanguage from "../store/actions/languageActions/detectLanguages";

const useStyles = makeStyles((theme) =>
  createStyles({
    textarea: {
      marginTop: theme.spacing(4),
    },
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
  console.log("detectedLanguage: ", detectedLanguage);
  const translation = useSelector((state) => state.translation);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const debounsedTranslate = useDebounce(value, 500);

  useLayoutEffect(() => {
    if (inputLanguage.value === "detect") {
      dispatch(detectLanguage(value)); //detectedLanguage.data.language[0].language

      const inputLng = detectedLanguage?.data?.language[0].language;

      dispatch(translateText(value, inputLng, outputLanguage.value));
      console.log("value, in", value, inputLng, outputLanguage.value);
    } else {
      dispatch(translateText(value, inputLanguage.value, outputLanguage.value));
    }
  }, [debounsedTranslate, detectedLanguage?.data?.language[0].language]);

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
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <LanguageAutocomplete
              languages={languagesWidthDetect}
              currentLanguage={inputLanguage.label}
              setLanguage={setInputLanguage}
              loading={languages.loading}
            />

            <TextField
              className={classes.textarea}
              fullWidth
              multiline
              minRows={4}
              value={value}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <LanguageAutocomplete
              languages={possibleLanguages}
              currentLanguage={outputLanguage.label}
              setLanguage={setOutputLanguage}
              loading={languages.loading}
            />

            {translation.loading || detectedLanguage.loading ? (
              <Skeleton width="100%" height={200} />
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
      </Container>
    </div>
  );
};

export default Translator;
