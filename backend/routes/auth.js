const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middleware/verifyFirebaseToken");
const User = require("../models/User");
router.get("/ping", (req, res) => {
  res.send("Auth route is working");
});

router.post(`/google`, verifyFirebaseToken, async (req, res) => {
  const { name, email, photo, uid } = req.body;

  try {
    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ name, email, photo, uid ,streak: 0});
      await user.save();
      res.status(200).json({ message: "User verified", user, isNew: true });
    }
    res.status(200).json({ message: "User exists", user, isNew: false });
    res.status(200).json({ message: "User verified", user });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
