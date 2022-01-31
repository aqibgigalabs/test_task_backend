const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  },
  username: { type: String },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  userGroup: { type: String },
});


module.exports = mongoose.model('User', UserSchema);
