import { combineReducers } from "redux";

import detectedLanguage from "./detectedLanguage";
import translation from "./translation";
import languages from "./languages";

const root = combineReducers({
  detectedLanguage,
  translation,
  languages,
});

export default root;
