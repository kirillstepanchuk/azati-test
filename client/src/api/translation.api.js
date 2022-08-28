import axios from "axios";

export const fetchTranslation = async (text, inputLanguage, outputLanguage) => {
  const options = {
    method: 'POST',
    url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
    params: {
      from: inputLanguage,
      'to[0]': outputLanguage,
      'api-version': '3.0',
      profanityAction: 'NoAction',
      textType: 'plain',
    },
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': "0d4b0d9f0emsh4ffd214bfa4b80ep1ea384jsna97179322795",
      'X-RapidAPI-Host': "microsoft-translator-text.p.rapidapi.com",
    },
    data: `[{"Text":"${text}"}]`,
  };

  const response = await axios.request(options);

  return response.data;
};
