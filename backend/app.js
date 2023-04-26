require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const newRxRouter = require('./routes/newRxRouter');
const newPatientRouter = require('./routes/newPatientRouter');

const uri = process.env.MONGO_URI;
const connect = async () => {
  try {
    mongoose.connect(uri)
  } catch (error) {
    console.error(error);
  }
}

connect()
  .then(() => {
    console.log('Connected to MongoDB!')
  })
  .catch(error => console.log(error));

const app = express();
app.use(cors({
  origin: 'http://18.212.66.103',
  credentials: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/newRx', newRxRouter);
app.use('/newPatient', newPatientRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
