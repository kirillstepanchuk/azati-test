const getLanguageArrayFromObject = (obj) => {
  return Object.entries(obj.translation).map((el) => ({
    label: el[1].name,
    value: el[0],
  }))
}

export default getLanguageArrayFromObject;