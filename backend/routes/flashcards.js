const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Flashcard = require('../models/Flashcard');
const verifyFirebaseToken = require("../middleware/verifyFirebaseToken");

router.post('/', async (req, res) => {
  try {
    const newCard = new Flashcard(req.body);
    await newCard.save();
    res.status(201).json(newCard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create flashcard' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const card = await Flashcard.findByIdAndDelete(req.params.id);
    if (!card) 
      return res.status(404).json({ message: 'Flashcard not found' });

    
    res.json({ message: 'Flashcard deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting flashcard' });
  }
});

router.get('/', async (req, res) => {
  try {
    const cards = await Flashcard.find();
    console.log(cards); 
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch flashcards' });
  }
});
router.put('/:id', async (req, res) => {
  const updated = await Flashcard.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});
router.post('/by-subjects', verifyFirebaseToken, async (req, res) => {
  try {
    const user = req.user;
    const dbUser = await User.findOne({ uid: user.uid });
    const today = new Date();
    const { subject } = req.body;

    // Ensure subject is one of user's allowed subjects
    const allowedSubjects = dbUser?.onboarding?.subjects || [];
    if (!allowedSubjects.includes(subject)) {
      return res.status(403).json({ error: "Unauthorized subject access" });
    }
    const flashcards = await Flashcard.find({
      subject,
      reviewHistory: {
        $elemMatch: {
          // userId: user.uid,
          // nextReview: { $lte: today }
        }
      }
  
    });

    res.json(flashcards);
  } catch (err) {
    console.error("Error fetching filtered flashcards:", err);
    res.status(500).json({ error: "Failed to fetch flashcards" });
  }
});
// // PATCH: Review a flashcard (with per-user history)
// router.patch(`/:id/review`,async(req,res)=>{
//   const {rating}=req.body;
//   const card =  await Flashcard.findById(req.params.id);

//   if (!card)
//     return res.status(404).json({message:"Card not found"});

//   let interval = card.interval||1;
//    if (rating === 'Easy') interval *= 2;
//   else if (rating === 'Medium') interval = Math.max(1, interval * 1.2);
//   else if (rating === 'Hard') interval = 1;

//   card.interval = interval;
//   card.reviewCount += 1;
//   card.nextReview = new Date(Date.now() + interval * 24 * 60 * 60 * 1000); // interval in days
//     // Initialize reviewHistory if not present
//   if (!card.reviewHistory) card.reviewHistory = [];

//   const existingReview = card.reviewHistory.find((r) => r.userId === userId);
//   if (existingReview) {
//     existingReview.lastReviewed = new Date();
//     existingReview.rating = rating;
//     existingReview.nextReview = nextReview;
//   } else {
//     card.reviewHistory.push({
//       userId,
//       lastReviewed: new Date(),
//       rating,
//       nextReview
//     });
//   }


//   await card.save();
//   res.json({ message: 'Updated review', nextReview: card.nextReview });
// });
router.patch('/:id/review', verifyFirebaseToken, async (req, res) => {
  const { rating } = req.body;
  const userId = req.user.uid; // ✅ this is needed!
  const card = await Flashcard.findById(req.params.id);

  if (!card) return res.status(404).json({ message: "Card not found" });

  // Spaced repetition interval logic
  let interval = card.interval || 1;
  if (rating === 'Easy') interval *= 2;
  else if (rating === 'Medium') interval = Math.max(1, interval * 1.2);
  else if (rating === 'Hard') interval = 1;

  const nextReview = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);

  card.interval = interval;
  card.reviewCount = (card.reviewCount || 0) + 1;

  if (!card.reviewHistory) card.reviewHistory = [];

  const existingReview = card.reviewHistory.find(r => r.userId === userId);
  if (existingReview) {
    existingReview.lastReviewed = new Date();
    existingReview.rating = rating;
    existingReview.nextReview = nextReview;
  } else {
    card.reviewHistory.push({
      userId,
      lastReviewed: new Date(),
      rating,
      nextReview
    });
  }

  await card.save();
  res.json({ message: 'Updated review', nextReview });
});


// //to get flashcrads due on that day only
// router.get(`/due`, async (req, res) => {
//   console.log("GET /due called");
//   const today = new Date();
//   const cards = await Flashcard.find({ nextReview: { $lte: today } });
//   res.json(cards);
// });

// GET flashcards filtered by user's subjects

// GET /api/flashcards/progress
router.get('/progress', verifyFirebaseToken, async (req, res) => {
  try {
    const user = req.user;
    const dbUser = await User.findOne({ uid: user.uid });

    const subjects = dbUser?.onboarding?.subjects || [];

    const progress = {};

    for (let subject of subjects) {
      const total = await Flashcard.countDocuments({ subject });
      const reviewed = await Flashcard.countDocuments({
        subject,
        reviewHistory: {
          $elemMatch: {
            userId: user.uid
          }
        }
      });

      progress[subject] = total === 0 ? 0 : Math.round((reviewed / total) * 100);
    }

    res.json(progress);
  } catch (err) {
    console.error("Error calculating progress:", err);
    res.status(500).json({ error: "Progress fetch failed" });
  }
});


module.exports = router;
