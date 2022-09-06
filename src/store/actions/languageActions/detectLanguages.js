import { DETECT_LANGUAGE, DETECT_LANGUAGE_SUCCESS, DETECT_LANGUAGE_ERROR } from "../../actionTypes";

const detectLanguage = (text) => ({
  type: DETECT_LANGUAGE,
  payload: {
    text,
  }
});

export const detectLanguageSuccess = (language) => ({
  type: DETECT_LANGUAGE_SUCCESS,
  payload: {
    language,
  }
})

export const detectLanguageError = (error) => ({
  type: DETECT_LANGUAGE_ERROR,
  payload: {
    error,
  }
})

export default detectLanguage;