const { User } = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send("Invalid password or email ");
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid Password or Email ");
  }
  const isValid = await bcrypt.compare(req.body.password, user.password);

  if (!isValid) {
    return res.status(400).send("Invalid Password or Email ");
  }
  const token = user.generateJWT();
  res.header("x-auth-token", token).send(token);
});

function validateUser(req) {
  const validationSchema = {
    email: Joi.string().required().min(5).max(50).email(),
    password: Joi.string().required().min(9).max(90),
  };
  return Joi.validate(req, validationSchema);
}

module.exports = router;
