import { put, call, takeEvery } from 'redux-saga/effects';

import { fetchLanguages } from "../../api/language.api";
import { GET_LANGUAGES } from "../actionTypes";
import { getLanguagesSuccess, getLanguagesError } from "../actions/languageActions/getLanguages";
import getLanguageArrayFromObject from '../../utils/getLanguageArrayFromObject';

export function* loadLanguages() {
  try {
    const data = yield call(fetchLanguages);
    console.log('data: ', data);
    yield put(getLanguagesSuccess(getLanguageArrayFromObject(data)));
  } catch (e) {
    yield put(getLanguagesError(e));
  }
}

export default function* languagesWatcher() {
  yield takeEvery(GET_LANGUAGES, loadLanguages);
}