const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

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

router.put("/updatedescription", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.description = req.body.description;
    await user.save();
    res.send("description added");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/", auth, upload.single("avatar"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.profilePictureName !== "Default.png") {
      const pathname = path.join(
        __dirname,
        "..",
        "uploads",
        user.profilePictureName
      );
      await fs.unlink(pathname, (err) => {
        if (err) {
          console.log("failed to delete image");
        } else {
        }
      });
    }
    user.profilePictureName = req.file.filename;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
