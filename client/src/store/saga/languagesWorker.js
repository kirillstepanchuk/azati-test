import { put, call, takeEvery } from 'redux-saga/effects';

import { fetchDetectedLanguage, fetchLanguages } from "../../api/language.api";
import { getLanguagesSuccess, getLanguagesError } from "../actions/languageActions/getLanguages";
import { detectLanguageError, detectLanguageSuccess } from '../actions/languageActions/detectLanguages';
import { DETECT_LANGUAGE, GET_LANGUAGES } from "../actionTypes";
import getLanguageArrayFromObject from '../../utils/getLanguageArrayFromObject';

export function* loadLanguages() {
  try {
    const data = yield call(fetchLanguages);

    yield put(getLanguagesSuccess(getLanguageArrayFromObject(data)));
  } catch (error) {
    yield put(getLanguagesError(error));
  }
}

export function* loadDetectedLanguage(action) {
  try {
    const data = yield call(fetchDetectedLanguage, action.payload.text);

    yield put(detectLanguageSuccess(data));
  } catch (error) {
    yield put(detectLanguageError(error));
  }
}

export default function* languagesWatcher() {
  yield takeEvery(GET_LANGUAGES, loadLanguages);
  yield takeEvery(DETECT_LANGUAGE, loadDetectedLanguage)
}