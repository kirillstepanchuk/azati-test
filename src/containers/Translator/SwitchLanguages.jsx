import React, { useCallback } from "react";
import { IconButton } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";

import { DETECT_LANGUAGE } from "../../constants";

const SwitchLanguages = ({
  inputLanguage,
  setInputLanguage,
  outputLanguage,
  setOutputLanguage,
  setInputText,
  translationText,
}) => {
  const onChangeLanguagesButtonClick = useCallback(() => {
    const temptInputLanguage = Object.assign({}, inputLanguage);
    const tempOutputLanguage = Object.assign({}, outputLanguage);

    const tempOutputText = translationText;

    setOutputLanguage(temptInputLanguage);
    setInputLanguage(tempOutputLanguage);

    setInputText(tempOutputText);
  }, [inputLanguage, outputLanguage, translationText]);

  return (
    <IconButton
      disabled={inputLanguage.value === DETECT_LANGUAGE.value}
      color="iconButton"
      onClick={onChangeLanguagesButtonClick}
    >
      <SyncIcon />
    </IconButton>
  );
};

export default SwitchLanguages;
