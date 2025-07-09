router.get("/practice-history", verifyFirebaseToken, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid });

    const today = new Date();
    const days = 42;
    const heatmap = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const isoDate = date.toISOString().split('T')[0];

      heatmap.push({
        date: isoDate,
        level: user.practiceHistory.includes(isoDate)
          ? Math.floor(Math.random() * 3) + 1 // random level for demo
          : 0
      });
    }

    res.json(heatmap);
  } catch (err) {
    console.error("Error fetching practice history:", err);
    res.status(500).json({ error: "Failed to fetch practice history" });
  }
});
