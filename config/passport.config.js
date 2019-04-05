const LocalStrategy    = require('passport-local').Strategy;
const JwtStrategy      = require('passport-jwt').Strategy;
const ExtractJwt       = require('passport-jwt').ExtractJwt;
const bcrypt           = require('bcrypt');
const config           = require('./').authentication;
const User             = require('../models/user.model');

module.exports = (passport) => {
  //For authenticating by local strategy============================
  passport.use(new LocalStrategy((username, password, next) => {
    User.findOne({ username })
      .then(user => {
        if(user) {
          bcrypt.compare(password, user.password)
            .then(isMatch => {
              if(isMatch) {
                next(null, user);
              } else {
                next(null, false, { message: 'Password is incorrect' });
              }
            })
            .catch(err => next(err));
        } else {
          next(null, false, { message: 'User not found' });
        }
      })
      .catch(err => {
        next(err);
      });
  }));

  passport.serializeUser((user, next) => {
    next(null, user._id);
  });

  passport.deserializeUser((id, next) => {
    User.findById(id)
      .then(user => next(null, user))
      .catch(err => next(null, false));
  });

  //For authenticating by jwt strategy==============================
  const options = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromHeader('Authorization'), //Fail in some situations(not recommended)
      ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      ExtractJwt.fromBodyField('Authorization'),
      ExtractJwt.fromAuthHeaderAsBearerToken()
    ])
  };

  passport.use(new JwtStrategy(options, (jwt_payload, next) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if(user) {
          next(null, user);
        } else {
          next(null, false);
        }
      })
      .catch(err => next(err));
  }));

}