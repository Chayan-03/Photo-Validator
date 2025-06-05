require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Define Schema and Model
const CountrySpecSchema = new mongoose.Schema({
  country: String,
  width: Number,
  height: Number,
  maxSizeKB: Number,
  backgroundColor: String,
  eyesOpen: Boolean,
  neutralExpression: Boolean,
  faceCoverage: Number,
  additionalRequirements: [String]
}, {
  collection: 'countryspec'
});

const CountrySpec = mongoose.model('CountrySpec', CountrySpecSchema);

// GET /countries → Return all country names
app.get('/countries', async (req, res) => {
  try {
    const countries = await CountrySpec.find({}, 'country');
    res.json(countries);
  } catch (err) {
    console.error("Error fetching countries:", err);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
});

// GET /specs/:country → Get full spec for a specific country
app.get('/specs/:country', async (req, res) => {
  try {
    const spec = await CountrySpec.findOne({ country: req.params.country });
    if (!spec) return res.status(404).json({ error: 'Country not found' });
    res.json(spec);
  } catch (err) {
    console.error("Error fetching spec:", err);
    res.status(500).json({ error: 'Failed to fetch spec' });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Backend server running on port ${PORT}`));