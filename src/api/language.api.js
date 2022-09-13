import axios from "axios";

import { LANGUAGES, API_URL, API_HOST, API_KEY } from "../constants";

export const fetchLanguages = async () => {
  const options = {
    method: 'GET',
    url: `${API_URL}/languages`,
    params: { 'api-version': '3.0', scope: 'translation' },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST,
    }
  };

  // const response = await axios.request(options);
  // return response.data;

  // Mock data, problems with get languages from API.
  return LANGUAGES;

};

export const fetchDetectedLanguage = async (text) => {
  const options = {
    method: 'POST',
    url: `${API_URL}/Detect`,
    params: { 'api-version': '3.0' },
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST,
    },
    data: `[{"Text":"${text}"}]`,
  };

  const response = await axios.request(options);

  return response.data;
}