const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/api/places', async (req, res) => {
  const { input } = req.query;
  const API_KEY = 'YOUR_GOOGLE_API_KEY'; // Replace with your Google API key

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
      params: {
        input,
        key: API_KEY,
        types: 'geocode',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).send('Failed to fetch suggestions');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
