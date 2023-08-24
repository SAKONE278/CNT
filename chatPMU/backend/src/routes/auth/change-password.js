const { findUserById } = require('../../dao/users');
const argon2 = require('argon2');
const isEmpty = require('../../utils/isEmpty');
const dictionary = require('../../dictionaries/auth');
const getTranslation = require('../../utils/getTranslation');

module.exports = async (req, res) => {
  const { password } = req.fields;
  const language = req.query.language;

  if (req.user.roles.includes('root')) {
    return res.status(500).json({ status: 'error', message: 'root user can not be edited via api', generic: true });
  }

  let user, result;

  try {
    user = await findUserById(req.user.id);
  } catch (e) {
    return res.status(500).json({ status: 'error', message: 'database read error', generic: true });
  }

  if (!user) {
    return res.status(404).json({ status: 'error', message: 'user not found', generic: true });
  }

  if (isEmpty(password)) {
    return res
      .status(400)
      .json({
        status: 'error',
        message: 'password required',
        password: getTranslation({ dictionary, code: 'password-required', language }),
      });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({
        status: 'error',
        message: 'password too short',
        password: getTranslation({ dictionary, code: 'password-too-short', language }),
      });
  }

  user.password = await argon2.hash(password);

  try {
    result = await user.save();
  } catch (e) {
    return res.status(500).json({ status: 'error', message: 'database write error', generic: true });
  }

  res.status(200).json({ status: 'success', result });
};
