import { put, call, takeEvery } from 'redux-saga/effects';

import { fetchTranslation } from '../../api/translation.api';
import { translateTextSuccess, translateTextError } from "../actions/translationActions/translateText";
import { TRANSLATE_TEXT } from "../actionTypes";

export function* loadTranslate(action) {
  try {
    const { text, inputText, outputText } = action.payload;

    const data = yield call(fetchTranslation, text, inputText, outputText);

    yield put(translateTextSuccess(data));
  } catch (error) {
    yield put(translateTextError(error));
  }
}

export default function* translationWatcher() {
  yield takeEvery(TRANSLATE_TEXT, loadTranslate);
}
