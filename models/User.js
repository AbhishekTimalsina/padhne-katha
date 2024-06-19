let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  Date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
