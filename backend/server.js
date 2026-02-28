const express = require('express');
const cors = require('cors');
require('dotenv').config();
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Health check
app.get('/', (req, res) => {
  res.send('Healing app backend is running!');
});

// AI healing path route
app.post('/api/healing-path', async (req, res) => {
  try {
    const { answers } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 1000,
      messages: [
        {
          role: 'system',
          content: 'You are a compassionate healing coach. Always respond ONLY with valid JSON — no markdown, no backticks, no extra text.'
        },
        {
          role: 'user',
          content: answers
        }
      ]
    });

    // Clean and return the JSON content
    const raw = response.choices[0].message.content;
    const clean = raw.replace(/```json|```/g, "").trim();

    // Validate it's real JSON before sending
    JSON.parse(clean); // throws if invalid
    res.json({ content: clean });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
