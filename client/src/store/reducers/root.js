import { combineReducers } from "redux";

import detectedLanguage from "./detectedLanguage";
import translation from "./translation";
import languages from "./languages";
import favorites from "./favorites";

const root = combineReducers({
  detectedLanguage,
  translation,
  languages,
  favorites,
});

export default root;
