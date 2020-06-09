const express = require("express");
const router = express.Router();
const { auth } = require("../Middleware/auth");
const { User } = require("../Models/UserModel");

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.send(user);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
