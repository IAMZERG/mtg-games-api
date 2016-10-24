var mongoose = require("mongoose");
var Schema = mongoose.Schema();

module.exports = mongoose.model('User', newSchema({
  name: String,
  password: String,
  admin: Boolean
}));


