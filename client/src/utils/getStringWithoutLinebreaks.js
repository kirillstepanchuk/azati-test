const getStringWithoutLineBreaks = (string) => {
  return string.replace(/[\r\n]/gm, '');
}

export default getStringWithoutLineBreaks;