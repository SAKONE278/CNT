const router = require('express').Router();
const config = require('../../../config');
const secret = config.secret;
const jwt = require('jsonwebtoken');
const isEmpty = require('../../utils/isEmpty');
const regexUsername = require('../../utils/regexUsername');
const argon2 = require('argon2');
const { findUserByUsername, findUserByEmail } = require('../../dao/users');
const dictionary = require('../../dictionaries/auth');
const getTranslation = require('../../utils/getTranslation');

router.post('*', async (req, res) => {
  let { username, password } = req.fields;
  const language = req.query.language;

  if (isEmpty(username)) {
    return res.status(400).json({
      status: 'error',
      message: 'username required',
      username: getTranslation({ dictionary, code: 'username-required', language }),
    });
  }

  if (isEmpty(password)) {
    return res.status(400).json({
      status: 'error',
      message: 'password required',
      username: getTranslation({ dictionary, code: 'password-required', language }),
    });
  }

  let email = username.toLowerCase();
  username = regexUsername(username);

  let user;

  try {
    user = await findUserByUsername(username);
  } catch (e) {
    return res.status(500).json({ status: 'error', message: 'database read error' });
  }

  if (!user) {
    try {
      user = await findUserByEmail(email);
    } catch (e) {
      return res.status(500).json({ status: 'error', message: 'database read error' });
    }
  }

  if (!user) {
    return res
      .status(400)
      .json({
        status: 'error',
        message: 'user not found',
        username: getTranslation({ dictionary, code: 'user-not-found', language }),
      });
  }

  argon2.verify(user.password, password).then(async (valid) => {
    if (valid) {
      jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          roles: user.roles,
          preference: user.preference,
        },
        secret,
        { expiresIn: Number.MAX_SAFE_INTEGER },
        async (err, token) => {
          if (err) return res.status(500).json({ status: 'error', message: 'error signing token' });
          user.lastLogin = Date.now();
          await user.save();
          res.status(200).json({ status: 'success', token });
        },
      );
    } else {
      res
        .status(400)
        .json({
          status: 'error',
          message: 'wrong password',
          password: getTranslation({ dictionary, code: 'wrong-password', language }),
        });
    }
  });
});

module.exports = router;
