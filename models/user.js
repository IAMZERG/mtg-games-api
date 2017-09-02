var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  password: String,
  admin: Boolean,
  requestingPasswordReset: { type: Boolean, default: false },
  resetTokenExpires: Date,
  resetToken: String
});

module.exports = mongoose.model("User");
