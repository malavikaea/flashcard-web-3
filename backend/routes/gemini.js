const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'models/gemini-1.5-flash',
  systemInstruction:
    "The chatbot should help users  with academics and motivate them in a friendly tone within 100 words",
});
router.post('/chat', async (req, res) => {
  const userPrompt = req.body.prompt;
  console.log("🟢 Prompt received:", userPrompt);

  try {
     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // For text
    const result = await model.generateContent(userPrompt);
    const response = result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (err) {
    console.error("❌ Gemini 2.5 error:", err);
    res.status(500).json({ error: 'Failed to talk to Gemini 2.5' });
  }
});

module.exports = router;
