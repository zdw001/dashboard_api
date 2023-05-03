const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
  website_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  link: String,
  username: String,
  password: String,
  notes: String,
  img: String
});

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
  websites: [{
    type: websiteSchema,
    requried: true,
    default: []
  }]
}, {
  collection:'users'
}); 

module.exports = User = mongoose.model("User", userSchema);
