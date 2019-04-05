const router   = require('express').Router();
const config   = require('../../config').authentication;
const passport = require('passport');
const jwt      = require('jsonwebtoken');
const User     = require('../../models//user.model');

//POST: /api/auth/local
//Todo: Create token by local authentication
router.post('/local', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) {
      console.log(err);
      return res.status(500).json({ Error: 'Internal Server Error' });
    }
    if(!user) {
      return res.status(400).json({ User: info.message });
    }

    const options = config.jwt.options;
    const secretOrKey = config.jwt.secret;
    const payload = {
      id: user._id,
      username: user.username
    }
    jwt.sign(payload, secretOrKey, options, (err, token) => {
      if(err) {
        res.status(500).json({ Error: 'Internal Server Error' });
      } else {
        res.status(201).json({ acessToken: 'Bearer ' + token });
      }
    });

  })(req, res, next);
});

//POST: /api/auth/jwt
//Todo: Create token by jwt authentication
router.post('/jwt', passport.authenticate('jwt', { session: false }),
 (req, res, next) => {
  
  const options = config.jwt.options;
  const secretOrKey = config.jwt.secret;
  const payload = {
    id: req.user._id,
    username: req.user.username
  };

  jwt.sign(payload, secretOrKey, options, (err, token) => {
    if(err) {
      res.status(500).json({ Error: 'Internal Server Error' });
    } else {
      res.status(201).json({ acessToken: 'Bearer ' + token });
    }
  });
});

module.exports = router;
