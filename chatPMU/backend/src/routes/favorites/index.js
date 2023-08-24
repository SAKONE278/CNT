const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use(
  '/list',
  passport.authenticate('jwt', { session: false, failureRedirect: '/api/auth/unauthorized' }, null),
  require('./list'),
);
router.use(
  '/toggle',
  passport.authenticate('jwt', { session: false, failureRedirect: '/api/auth/unauthorized' }, null),
  require('./toggle'),
);

module.exports = router;
