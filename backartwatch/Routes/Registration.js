const { User } = require("../Models/UserModel");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
router.get("/", async (req, res) => {
  const users = await User.find().sort({ lastName: 1 });
  res.send(users);
});

router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("User already exists");
    }
    user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      profilePictureName: "Default.png",
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateJWT();
    res.header("x-auth-token", token).send(token);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
