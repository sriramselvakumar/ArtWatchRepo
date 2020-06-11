const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  filename: { type: String, required: true },
  likes: { type: Number },
  date: { type: Date },
});

const Post = mongoose.model("Post", postSchema);

module.exports.Post = Post;
module.exports.postSchema = postSchema;
