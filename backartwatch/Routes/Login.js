const { User } = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.send(false);
  }
  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) {
    return res.send(false);
  }
  const token = user.generateJWT();
  res.header("x-auth-token", token).send(token);
});

module.exports = router;
