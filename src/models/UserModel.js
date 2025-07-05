const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unqiue: true },
  password: { type: String, required: true },
});

userSchema.methods.verifyPassword = function (password) {
  return this.password === password;
};


module.exports = mongoose.model("User", userSchema);
