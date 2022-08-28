import axios from "axios";

import { LANGUAGES } from "../constants";

export const fetchLanguages = async () => {
  const options = {
    method: 'GET',
    url: 'https://microsoft-translator-text.p.rapidapi.com/languages',
    params: { 'api-version': '3.0', scope: 'translation' },
    headers: {
      'X-RapidAPI-Key': '0d4b0d9f0emsh4ffd214bfa4b80ep1ea384jsna97179322795',
      'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
    }
  };

  const response = await axios.request(options);

  // return response.data;

  // Mock data, problems with get languages from API.
  return LANGUAGES;

};

export const fetchDetectedLanguage = async (text) => {
  const options = {
    method: 'POST',
    url: 'https://microsoft-translator-text.p.rapidapi.com/Detect',
    params: { 'api-version': '3.0' },
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': "0d4b0d9f0emsh4ffd214bfa4b80ep1ea384jsna97179322795",
      'X-RapidAPI-Host': "microsoft-translator-text.p.rapidapi.com",
    },
    data: `[{"Text":"${text}"}]`,
  };

  const response = await axios.request(options);

  return response.data;
}