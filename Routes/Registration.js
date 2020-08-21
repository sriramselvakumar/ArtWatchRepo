const { User } = require("../Models/UserModel");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
router.get("/", async (req, res) => {
  const users = await User.find().sort({ lastName: 1 });
  res.send(users);
});

router.post("/validation", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (firstName === "" || lastName === "") {
    return res.send("Please enter your first name or last name");
  }
  let user = await User.findOne({ email });
  if (user) {
    return res.send("User already exists");
  }
  if (password.length < 9) {
    return res.send("Password must be 9 characters long");
  }
  res.send(true);
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
      description: "No Description Provided",
      posts: [],
      followers: [],
      following: [],
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
