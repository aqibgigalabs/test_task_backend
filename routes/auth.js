const express = require('express');
const router = express.Router();
const User = require('../models/User');
const brcypt = require('../helpers/bcrypt');
const jwt = require('../helpers/jwt');
const { protect } = require('../middleware/protect')


router.post('/login', async (req, res) => {
  try {

    const { username, password } = req.body;
    const userFound = await User.findOne({ username });

    if (!userFound) return res.status(400).json({
      success: 'false',
      message: "account not exist!"
    });
    const passIsMatch = await brcypt.comparewPassword(
      password,
      userFound.password
    );

    if (!passIsMatch) return res.status(400).json({
        success: 'false',
        message: 'Invalid Credentials!',
      });

    userFound.password = undefined;
    const token = await jwt.generarteToken(userFound);
    res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 3600000 });
    res.status(200).send({
      success: 'true',
      data: userFound
    });
  } catch (error) {
   res.status(500).send({
     success: 'false',
     message: 'Something Went Worng',
   });
  }
});

router.post('/logout', protect, async (req, res) => {
  try {
    res.cookie('jwt', '', { httpOnly: true, secure: true, maxAge: 3600000 });
    res.status(200).send({
      success: 'true',
    });
  } catch (error) {
    res.status(500).send({
      success: 'false',
      message: 'Something Went Worng',
    });
  }
});

module.exports = router;
