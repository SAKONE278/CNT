const getOutput = ({ dictionary, language, code }) => {
  if (!dictionary) {
    return '[dictionary error]';
  }

  if (!dictionary[code]) {
    return '[dictionary error]';
  }

  if (dictionary[code][language]) {
    return dictionary[code][language];
  }

  return dictionary[code]['en'];
};

module.exports = getOutput;
