const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const upload = multer({ storage: storage });
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

router.put("/", auth, upload.single("avatar"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.profilePictureName = req.file.filename;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
