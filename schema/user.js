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
    type: mongoose.Schema.Types.Mixed,
    required: true,
    default: {}
  }, 
  settings: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    default: {}
  },
  websites: {
    type: Array,
    requried: true,
    default: []
  }
}, {
  collection:'users'
}); 

module.exports = User = mongoose.model("User", userSchema);
