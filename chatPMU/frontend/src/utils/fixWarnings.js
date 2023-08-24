const fixWarnings = () => {
  const warn = console.error;

  function logWarning(...warnings) {
    let showWarning = true;
    warnings.forEach((warning) => {
      if (warning.includes('UNSAFE_')) showWarning = false;
      else if (warning.includes('SourceMap')) showWarning = false;
      else if (warning.includes('DevTools')) showWarning = false;
    });
    if (showWarning) warn(...warnings);
  }

  console.error = logWarning;
};

export default fixWarnings;
