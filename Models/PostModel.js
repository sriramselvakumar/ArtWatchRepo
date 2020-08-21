const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  filename: { type: String, required: true },
  likes: [{ type: String }],
  date: { type: Date },
  owner: { type: String },
});

const Post = mongoose.model("Post", postSchema);

module.exports.Post = Post;
module.exports.postSchema = postSchema;
