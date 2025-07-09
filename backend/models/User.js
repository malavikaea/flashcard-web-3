// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: String,
  name: String,
  email: String,
  photo: String,
  isAdmin: { type: Boolean, default: false },

  streak: { type: Number, default: 0 },
  practiceHistory: [String],
  lastPracticed: { type: Date, default: null },
  duration: { type: String, default: "30 min" },
  onboarding: {
    subjects: [String],
    level: String,
    goal: String,
    language: String,
    duration: String,
  }, 
});

module.exports = mongoose.model('User', userSchema);
