import { LANGUAGES } from "../constants"

const findLanguage = (language) => {
  return {
    label: LANGUAGES.translation[language].name,
    value: language,
  };
}

export default findLanguage;