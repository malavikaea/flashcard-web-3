// checkModels.js
const axios = require('axios');
require('dotenv').config();

const key = process.env.GEMINI_API_KEY;
console.log("yeah");
axios.get(`https://generativelanguage.googleapis.com/v1/models?key`)
  .then(res => {
    console.log("Available Models:");
    res.data.models.forEach(model => console.log(model.name));
  })
  .catch(err => {
    console.error("Error fetching models:", err?.response?.data || err.message);
  });
