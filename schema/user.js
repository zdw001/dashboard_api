const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  profile: {
    type: Object,
    required: true
  }, 
  settings: {
    type: Object,
    required: true
  },
  websites: {
    type: Array,
    requried: true
  }
}, {
  collection:'users'
}); 

module.exports = User = mongoose.model("User", userSchema);
