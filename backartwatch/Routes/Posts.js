const { Post } = require("../Models/PostModel");
const { User } = require("../Models/UserModel");
const { auth } = require("../Middleware/auth");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/", auth, async (req, res) => {
  try {
    let posts = await Post.find();
    posts = posts.filter((post) => post.owner !== req.user.id);
    res.send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    res.send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", auth, async (req, res) => {
  let post = new Post({
    name: req.body.name,
    description: req.body.description,
    filename: req.body.filename,
    likes: [],
    date: req.body.date,
    owner: req.user.id,
  });
  try {
    post = await post.save();
    res.send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/updatelike/:id/:isLiked", auth, async (req, res) => {
  const { id, isLiked } = req.params;
  try {
    let post = await Post.findById(id);
    if (isLiked === "0") {
      post.likes = post.likes.filter((user) => user !== req.user.id);
    } else if (isLiked === "1") {
      post.likes.push(req.user.id);
    }
    await post.save();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", auth, upload.single("painting"), async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post.filename !== "Default.png") {
      const pathname = path.join(__dirname, "..", "uploads", post.filename);
      await fs.unlink(pathname, (err) => {
        if (err) {
          console.log("failed to delete image");
        } else {
        }
      });
    }
    post.filename = req.file.filename;
    post = await post.save();
    res.send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/final/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    post.name = req.body.name;
    post.description = req.body.description;
    await post.save();
    let user = await User.findById(req.user.id);
    user.posts.push(req.params.id);
    await user.save();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/update/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    post.name = req.body.name;
    post.description = req.body.description;
    await post.save();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findByIdAndRemove(req.params.id);
    if (post.filename !== "Default.png") {
      const pathname = path.join(__dirname, "..", "uploads", post.filename);
      await fs.unlink(pathname, (err) => {
        if (err) {
          console.log("failed to delete image");
        } else {
        }
      });
    }
    let user = await User.findById(req.user.id);
    user.posts = user.posts.filter((post) => post !== req.params.id);
    await user.save();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
