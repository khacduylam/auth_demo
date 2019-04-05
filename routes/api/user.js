const router              = require('express').Router();
const passport            = require('passport');
const bcrypt              = require('bcrypt');
const User                = require('../../models/user.model');
const { pagination }      = require('./../../config');            
const { isValidUsername,
        isValidPassword } = require('../../untils/validation');

//GET:  /api/users/:id
//Todo: Get user info with id
router.get('/:id', async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);

    if(user) {
      res.json({ user });
    } else {
      res.status(404).json({ user: 'User not found' });
    }
  } catch(err) {
    console.log(`[GET] /api/users error: ${err}`);
    res.status(500).json({ Error: 'Internal Server Error' })
  }
});

//POST: /api/users
//Todo: Create a new user
router.post('/', async (req, res, next) => {
  try {
    if(await isValidUsername(req.body.username) === -1 || 
       await isValidPassword(req.body.password) === -1) {

      throw {
        status: 400,
        message: 'Bad request'
      }
    }

    let hash = await bcrypt.hash(req.body.password, 15);
    let newUser = new User({
      username: req.body.username,
      password: hash
    });

    let user = await newUser.save();
    res.status(201).json({ user: user });
  } catch(err) {
    console.log(`[POST] /api/users error: ${err}`);
    err.status ? res.status(err.status).json({ Error: err }) :
                 res.status(500).json({ Error: 'Internal Server Error' });
  }
})

//UPDATE: /api/users/:id
//Todo: Change user password with id
router.patch('/:id', passport.authenticate('jwt', { session: false }), 
async (req, res, next) => {

  try {
    if(await isValidPassword(req.body.newPassword) === -1) {
      throw {
        status: 400,
        message: 'Bad request'
      }
    }

    let user = await User.findById(req.params.id);

    if(user) {
      if(user._id.equals(req.user._id)) {
        let oldPassword = user.password;
        let hash = await bcrypt.hash(req.body.newPassword, 15);
        //let updatedUser = await user.updateOne({ $set: { password: hash } }, { new: true });
        let updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
          { $set: { password: hash } }, 
          { new: true });

        res.json({ 
          user: updatedUser, 
          oldPassword,
          newPassword: updatedUser.password 
        });
      } else {
        throw {
          status: 401,
          message: 'User not authorized'
        }
      }
    } else {
      throw {
        status: 404,
        message: 'User not found'
      }
    }
  } catch(err) {
    console.log(`[PATCH] /api/users/:id error: ${err}`);
    err.status ? res.status(err.status).json({ Error: err }) :
                 res.status(500).json({ Error: 'Internal Server Error' });
  }
});

//DELETE: /api/users/:id
//Todo: Delete user with id
router.delete('/:id', passport.authenticate('jwt', { session: false }), 
async (req, res, next) => {

try {
    let user = await User.findById(req.params.id);

    if(user) {
      if(user._id.equals(req.user._id)) {
        let deletedUser = await User.findByIdAndDelete(req.params.id);

        res.json({ daleted: true, user: deletedUser });
      } else {
        throw {
          status: 401,
          message: 'User not authorized'
        }
      }
    } else {
      throw {
        status: 404,
        message: 'User not found'
      }
    }
  } catch(err) {
    console.log(`[DELETE] /api/users/:id error: ${err}`);
    err.status ? res.status(err.status).json({ Error: err }) :
                 res.status(500).json({ Error: 'Internal Server Error' });
  }
});

//GET:  /api/users
//Todo: Get all users info
router.get('/', passport.authenticate('jwt', { session: false }),
(req, res, next) => {

  try {
    let options = {
      page: req.query.page ? Number(req.query.page) : 1,
      limit: pagination.limit,
      sort: pagination.sort
    }

    User.paginate({}, options, (err, users) => {
      res.json({ total: users.length, users });

    });
  } catch(err) {
    console.log(`[GET] /api/users error: ${err}`);
    res.status(500).json({ Error: 'Internal Server Error' });
  }
});

module.exports = router;

