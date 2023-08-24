const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('../../config');
const secret = config.secret;
const User = require('../models/User');

module.exports = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
  },
  (payload, done) => {
    User.findById(payload.id)
      .then((user) => {
        if (user) {
          return done(null, {
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.roles,
            firstName: user.firstName,
            lastName: user.lastName,
          });
        }
        return done(null, false);
      })
      .catch((err) => {
        console.error(err);
      });
  },
);
