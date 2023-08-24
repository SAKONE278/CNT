const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post(
  '/upload',
  passport.authenticate('jwt', { session: false, failureRedirect: '/api/auth/unauthorized' }, null),
  require('./upload'),
);
router.get('/:id', require('./get'));
router.get(
  '/info/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/api/auth/unauthorized' }, null),
  require('./info'),
);
router.post(
  '/sign/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/api/auth/unauthorized' }, null),
  require('./sign'),
);

module.exports = router;
