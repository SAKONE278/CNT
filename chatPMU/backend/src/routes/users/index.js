const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use(
  '/create',
  passport.authenticate('jwt', { session: false, failureRedirect: '/api/auth/unauthorized' }, null),
  require('./create'),
);
router.use(
  '/search',
  passport.authenticate('jwt', { session: false, failureRedirect: '/api/auth/unauthorized' }, null),
  require('./search'),
);
router.use(
  '/edit',
  passport.authenticate('jwt', { session: false, failureRedirect: '/api/auth/unauthorized' }, null),
  require('./edit'),
);
router.use(
  '/delete',
  passport.authenticate('jwt', { session: false, failureRedirect: '/api/auth/unauthorized' }, null),
  require('./delete'),
);
router.use(
  '/delete-many',
  passport.authenticate('jwt', { session: false, failureRedirect: '/api/auth/unauthorized' }, null),
  require('./delete-many'),
);
router.use(
  '/status',
  passport.authenticate('jwt', { session: false, failureRedirect: '/api/auth/unauthorized' }, null),
  require('./status'),
);
router.use(
  '/last-online',
  passport.authenticate('jwt', { session: false, failureRedirect: '/api/auth/unauthorized' }, null),
  require('./last-online'),
);

module.exports = router;
