const jwt = require('jsonwebtoken');
const CONSTANTS = require('../config/constant');


const generarteToken = (user) => {
  return jwt.sign(
    {...user},
    CONSTANTS.JWT_SECRET_KEY,
    { expiresIn: CONSTANTS.JWT_SESSION_TIME }
  );
};


module.exports = { generarteToken };