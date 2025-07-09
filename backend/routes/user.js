// routes/user.js
const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middleware/verifyFirebaseToken");
const User = require("../models/User");

router.post("/practice", verifyFirebaseToken, async (req, res) => {
  const uid = req.user.uid;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isoDate = today.toISOString().split("T")[0];

  try {
    const user = await User.findOne({ uid });

    if (!user) return res.status(404).json({ error: "User not found" });

    const lastDate = user.lastPracticed;
    let newStreak = 1;

    if (lastDate) {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const last = new Date(lastDate);
      last.setHours(0, 0, 0, 0);

      if (last.getTime() === yesterday.getTime()) {
        newStreak = user.streak + 1;
      } else if (last.getTime() === today.getTime()) {
        newStreak = user.streak;
      }
    }

    user.streak = newStreak;
    user.lastPracticed = today;

    // ✅ Track history (add today's date if not already there)
    if (!user.practiceHistory) {
      user.practiceHistory = [];
    }

    if (!user.practiceHistory.includes(isoDate)) {
      user.practiceHistory.push(isoDate);
    }

    await user.save();

    res.json({
      streak: user.streak,
      lastPracticed: user.lastPracticed,
      practiceHistory: user.practiceHistory,
    });
  } catch (err) {
    console.error("Error updating streak:", err);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/analytics", verifyFirebaseToken, async (req, res) => {
  try {
    const { uid } = req.user;
    const user = await User.findOne({ uid: req.user.uid });

    const today = new Date();
    const heatmap = [];
    const weekly = [];

    // Past 42 days for heatmap
    for (let i = 41; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const key = date.toISOString().split('T')[0];
      const duration = user.dailyStudy?.[key] || 0;
      heatmap.push({ date: key, level: Math.min(Math.floor(duration / 15), 3) });
    }

    // Past 7 days for weekly chart + avg session
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const key = date.toISOString().split('T')[0];
      weekly.push(user.dailyStudy?.[key] || 0);
    }

    const total = weekly.reduce((a, b) => a + b, 0);
    const avg = Math.round(total / 7);

    // Today's progress
    const todayKey = today.toISOString().split('T')[0];
    const timeStudiedToday = user.dailyStudy?.[todayKey] || 0;

    res.json({
      heatmap,
      weekly,
      avgSession: avg,
      timeStudiedToday
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ error: "Analytics failed" });
  }
});

// Save onboarding data
router.post('/onboarding', verifyFirebaseToken, async (req, res) => {
  try {
    const { uid } = req.user;
    const { subjects, level, goal, language, duration } = req.body;

    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.onboarding = { subjects, level, goal, language, duration };
    await user.save();

    res.status(200).json({ message: 'Onboarding saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/me', verifyFirebaseToken, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid });
    if (!user) return res.status(404).json({ error: "User not found" });

    // res.json(user);
    res.json({
      uid: user.uid,
      name: user.name,
      email: user.email,
      photo: user.photo,
      isAdmin: user.isAdmin,         // ✅ include admin status
      onboarding: user.onboarding,   // optional if needed
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/practice", verifyFirebaseToken, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      streak: user.streak,
      lastPracticed: user.lastPracticed,
      practiceHistory: user.practiceHistory || []
    });
  } catch (err) {
    console.error("Error getting practice data:", err);
    res.status(500).json({ error: "Failed to fetch practice data" });
  }
});

module.exports = router;
