import { all } from 'redux-saga/effects';

import languagesWatcher from './languagesWorker';

export default function* sagaWatcher() {
  yield all([
    languagesWatcher(),
  ]);
}