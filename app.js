const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const CONSTANTS = require('./config/constant');
const cors = require('cors');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();


mongoose.connect(
  CONSTANTS.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('DB CONNECTED TO URI : ' + CONSTANTS.MONGO_URI)
);

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.use('*', (req, res ) => {
  res.status(404)
});

module.exports = app;
