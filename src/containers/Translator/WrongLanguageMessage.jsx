import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { selectDetectedLanguageState } from "../../store/selectors";
import detectLanguage from "../../store/actions/languageActions/detectLanguages";
import { DETECT_LANGUAGE } from "../../constants";

const WrongLanguageMessage = ({ inputLanguage, inputText, outputText }) => {
  const [isLanguagesMatch, setIsLanguagesMatch] = useState(false);

  const dispatch = useDispatch();
  const detectedLanguage = useSelector(selectDetectedLanguageState);

  const detectedLanguageValue = detectedLanguage?.data?.language[0]?.language;

  useEffect(() => {
    if (inputLanguage.value !== DETECT_LANGUAGE.value) {
      dispatch(detectLanguage(inputText));

      if (detectedLanguageValue) {
        setIsLanguagesMatch(inputLanguage.value !== detectedLanguageValue);
      }
    }
  }, [outputText, detectedLanguageValue]);

  return (
    <>
      {isLanguagesMatch && (
        <Typography>
          Perhaps you need to change the keyboard layout or input language
        </Typography>
      )}
    </>
  );
};

export default WrongLanguageMessage;
