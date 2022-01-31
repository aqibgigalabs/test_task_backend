const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/protect')

/* GET users listing. */

router.put('/update', protect, async (req, res) => {
  const findUserUpdate = await User.findOneAndUpdate({_id: req.user._id}, req.body, {new: true});

  if(!findUserUpdate) {
    return res.status(400).json({
      success: 'false',
      message: "account not exist!"
    });
  }


  res.status(201).json({
    success: 'true',
    message: "user not updated!",
    data: findUserUpdate
  });
});

module.exports = router;
