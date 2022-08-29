import { TRANSLATE_TEXT, TRANSLATE_TEXT_SUCCESS, TRANSLATE_TEXT_ERROR } from "../../actionTypes";

const translateText = (text, inputText, outputText) => ({
  type: TRANSLATE_TEXT,
  payload: {
    text,
    inputText,
    outputText
  },
});

export const translateTextSuccess = (text) => ({
  type: TRANSLATE_TEXT_SUCCESS,
  payload: {
    text,
  }
})

export const translateTextError = (error) => ({
  type: TRANSLATE_TEXT_ERROR,
  payload: {
    error,
  }
})

export default translateText;