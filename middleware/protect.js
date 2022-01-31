const User  = require('../models/User');
const jwt = require('jsonwebtoken');
const CONSTANT = require('../config/constant')

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];


    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // Unautorized
    jwt.verify(token, CONSTANT.JWT_SECRET_KEY, async (err, payload) => {
      const user = payload._doc;

      if (err && err.message == 'jwt expired') return res.status(403).json({ message: 'Please login again!' });
      if (err) return res.sendStatus(403);
      else if (!(await User.findOne({_id:user._id}))) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(403).json({ message: 'Please login again!' });
  }
};

module.exports = { protect };
