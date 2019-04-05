const session        = require('express-session');
const passport       = require('passport');
const bodyParser     = require('body-parser');
const mongoose       = require('mongoose');
const connectDB      = require('./config/mongodb.config');
const configPassport = require('./config/passport.config');
const express        = require('express');
const app            =  express();

//Routers
const userRouter     = require('./routes/api/user');
const authRouter     = require('./routes/api/authentication');

//Connect database
connectDB(mongoose);

//Config passport
configPassport(passport);

//Use middlewares
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res, next) => res.json({message: 'Hello guy!'}));
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

module.exports = app;