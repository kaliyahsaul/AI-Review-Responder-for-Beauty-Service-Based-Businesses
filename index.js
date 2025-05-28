const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const ReviewSchema = new mongoose.Schema({
  businessId: String,
  customerName: String,
  reviewText: String,
  sentiment: String,
  aiResponse: String,
});

const Review = mongoose.model('Review', ReviewSchema);

app.post('/generate-response', async (req, res) => {
  const { reviewText, tone } = req.body;
  try {
    const prompt = `Write a ${tone} response to this Google review: "${reviewText}"`;
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'text-davinci-003',
      prompt,
      max_tokens: 100
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });
    res.json({ aiResponse: response.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: 'AI generation failed' });
  }
});

app.post('/save-review', async (req, res) => {
  const { businessId, customerName, reviewText, sentiment, aiResponse } = req.body;
  const newReview = new Review({ businessId, customerName, reviewText, sentiment, aiResponse });
  await newReview.save();
  res.json({ message: 'Review saved' });
});

app.listen(5000, () => console.log('Backend server running on http://localhost:5000'));
