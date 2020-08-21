const { User } = require("../Models/UserModel");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;
  let user = await User.findOne({ email });
  let redirect = "";
  if (!user) {
    user = new User({
      email,
      profilePictureName: "Default.png",
      description: "No Description Provided",
      posts: [],
      followers: [],
      following: [],
    });
    redirect = "/createprofilepic";
    user = await user.save();
  } else {
    redirect = "/myprofile";
  }
  const token = user.generateJWT();
  res.header("x-auth-token", token).send({ token, redirect });
});

/*router.post("/", async (req, res) => {
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
});*/

module.exports = router;
