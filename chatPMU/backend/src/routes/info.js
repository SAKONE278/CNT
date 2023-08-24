const info = require('../../version.json');

module.exports = (req, res) => {
  res.status(200).json({
    version: info.version,
    build: info.build,
  });
};
