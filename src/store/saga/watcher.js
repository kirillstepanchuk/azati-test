import { all } from 'redux-saga/effects';

import languagesWatcher from './languagesWorker';
import translationWatcher from "./translationWatcher"

export default function* sagaWatcher() {
  yield all([
    languagesWatcher(),
    translationWatcher(),
  ]);
}
