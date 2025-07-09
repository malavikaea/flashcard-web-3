const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  uid: String,
  question: String,
  answer: String,
  subject:String,
  createdAt: { type: Date, default: Date.now },

  interval: { type: Number, default: 1 }, // days between reviews
  reviewHistory: [
    {
      userId: String, // Firebase UID
      lastReviewed: Date,
      rating: String, // 'Easy', 'Medium', 'Hard'
      nextReview: {
    type: Date,
    default: Date.now // fallback if missing
  }
    }
  ]
})
module.exports = mongoose.model('Flashcard', flashcardSchema);
