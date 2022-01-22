const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Missing required field : name"],
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, "Missing required field : email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Incorrect email format : {VALUE}"
    ],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Missing required field : password"],
    minlength: 6
  }
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getToken = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME
    }
  );
};

UserSchema.methods.validatePassword = async function (providedPassword) {
  return await bcrypt.compare(providedPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
