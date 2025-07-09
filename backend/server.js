require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const testRouter = express.Router();

testRouter.get("/ping", (req, res) => res.send("pong"));
app.use("/test", testRouter);

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/auth"); 
app.use("/api/auth", authRoutes);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/flashcards', require('./routes/flashcards'));

const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);


const geminiRoutes = require('./routes/gemini');
app.use('/api/gemini', geminiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
