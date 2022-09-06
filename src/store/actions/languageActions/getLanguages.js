import { GET_LANGUAGES, GET_LANGUAGES_SUCCESS, GET_LANGUAGES_ERROR } from "../../actionTypes";

const getLanguages = () => ({
  type: GET_LANGUAGES,
});

export const getLanguagesSuccess = (languages) => ({
  type: GET_LANGUAGES_SUCCESS,
  payload: {
    languages,
  }
})

export const getLanguagesError = (error) => ({
  type: GET_LANGUAGES_ERROR,
  payload: {
    error,
  }
})

export default getLanguages;