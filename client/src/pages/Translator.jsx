import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import { makeStyles, createStyles } from "@mui/styles";

import { fetchTranslation } from "../api/translation.api";
import { fetchLanguages } from "../api/language.api";
import getLanguages from "../store/actions/languageActions/getLanguages";
import useDebounce from "../hooks/useDebounce";
import Header from "../components/Header/Header";
import Container from "../components/Container/Container";
import { useDispatch, useSelector } from "react-redux";
import LanguageAutocomplete from "../components/Autocomplete/LanguageAutocomplete";
import { Skeleton } from "@mui/material";

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
  const [translatedText, setTranslatedText] = useState("");
  const [possibleLanguages, setPossibleLanguages] = useState([]);

  const [inputLanguage, setInputLanguage] = useState({
    label: "Russian",
    value: "ru",
  });
  const [outputLanguage, setOutputLanguage] = useState({
    label: "English",
    value: "en",
  });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const debounsedTranslate = useDebounce(value, 500);

  useEffect(() => {
    const translation = fetchTranslation(
      value,
      inputLanguage.value,
      outputLanguage.value
    );

    translation.then((res) => setTranslatedText(res[0].translations[0].text));
  }, [debounsedTranslate]);

  const { data, loading, error } = useSelector((state) => state.languages);
  console.log("data, loading, error: ", data, loading, error);
  const dispatch = useDispatch();

  useEffect(() => {
    const languages = fetchLanguages();
    dispatch(getLanguages());

    languages.then((data) =>
      setPossibleLanguages(
        Object.entries(data.translation).map((el) => ({
          label: el[1].name,
          value: el[0],
        }))
      )
    );
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            {/* {!data ? (
              <Skeleton variant="rounded" width={210} height={60} />
            ) : ( */}
            <LanguageAutocomplete
              languages={data?.languages || []}
              currentLanguage={inputLanguage.label}
              setLanguage={setInputLanguage}
              loading={loading}
            />
            {/* )} */}

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
              loading={loading}
            />

            <TextField
              className={classes.textarea}
              fullWidth
              multiline
              minRows={4}
              value={translatedText}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Translator;
