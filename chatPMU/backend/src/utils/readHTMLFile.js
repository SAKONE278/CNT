const fs = require('fs');

const readHTMLFile = async (path) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(path)) {
      return reject(`mail template does not exist: ${path}`);
    }
    fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
      if (err) {
        console.log(`error while reading html template at path ${path}`.red);
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
};

module.exports = readHTMLFile;
