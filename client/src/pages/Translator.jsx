import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { fetchTranslation } from "../api/translation.api";
import { fetchLanguages } from "../api/language.api";
import useDebounce from "../hooks/useDebounce";

const Translator = () => {
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
    if (debounsedTranslate) {
      const translation = fetchTranslation(
        value,
        inputLanguage.value,
        outputLanguage.value
      );

      translation.then((res) => setTranslatedText(res[0].translations[0].text));
    }
  }, [debounsedTranslate]);

  useEffect(() => {
    const languages = fetchLanguages();

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
      <Autocomplete
        disablePortal
        disableClearable
        isOptionEqualToValue={(option, value) => option.label === value}
        options={possibleLanguages}
        sx={{ width: 300 }}
        value={inputLanguage.label}
        onChange={(event, newValue) => {
          setInputLanguage(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Language" />}
      />

      <TextField multiline maxRows={4} value={value} onChange={handleChange} />

      <Autocomplete
        disablePortal
        disableClearable
        isOptionEqualToValue={(option, value) => option.label === value}
        options={possibleLanguages}
        sx={{ width: 300 }}
        value={outputLanguage.label}
        onChange={(event, newValue) => {
          setOutputLanguage(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Language" />}
      />

      <TextField multiline maxRows={4} value={translatedText} />
    </div>
  );
};

export default Translator;
