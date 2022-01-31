const mongoose = require('mongoose');
const User = require('../models/User');
const CONSTANTS = require('../config/constant');
const bcrypt = require('../helpers/bcrypt');

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


const users = [
  {
    firstName: 'Fulano',
    lastName: 'Admin',
    username: 'admin',
    password: 'one.admin.two.three',
    userGroup: 'admin',
  },
  {
    firstName: 'Mengano',
    lastName: 'User',
    username: 'user',
    password: 'one.user.two.three',
    userGroup: 'user',
  },

]

const CreateUsers = async (users) => {
  try {
    for (const user of users) {
      user.password = await bcrypt.hashPassword(user.password);
    }

    const userCreated = await User.insertMany(users);
    console.log(userCreated);
  } catch (error) {
    console.log('eer', error);
  }

}


CreateUsers(users);