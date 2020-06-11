const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 1, maxlength: 60 },
  lastName: { type: String, required: true, minlength: 1, maxlength: 80 },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  password: { type: String, required: true, minlength: 9, maxlength: 90 },
  profilePictureName: { type: String },
  description: { type: String },
  posts: [{ type: String }],
});

UserSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      id: this._id,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", UserSchema);

module.exports.User = User;
module.exports.UserSchema = UserSchema;
