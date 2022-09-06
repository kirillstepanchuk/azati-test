import { combineReducers } from "redux";

import detectedLanguage from "./detectedLanguage";
import translation from "./translation";
import languages from "./languages";
import favorites from "./favorites";
import history from "./history"

const root = combineReducers({
  detectedLanguage,
  translation,
  languages,
  favorites,
  history,
});

export default root;
