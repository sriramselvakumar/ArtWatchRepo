const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePictureName: { type: String },
  description: { type: String },
  posts: [{ type: String }],
  followers: [{ type: String }],
  following: [{ type: String }],
});

UserSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      id: this._id,
    },
    process.env.jwt_Private
  );
  return token;
};

const User = mongoose.model("User", UserSchema);

module.exports.User = User;
module.exports.UserSchema = UserSchema;
