const express = require('express');
const axios = require('axios'); // Import axios for making API calls

const router = express.Router();

const API_URL = 'https://raw.githubusercontent.com/fardanahmed/recite-ml/refs/heads/master/data/quran.json'; // Predefined API URL

router.get('/get-surah', async (req, res) => {
  try {
    // Fetch data from the external API
    const response = await axios.get(API_URL);
    let { data } = response;
    data = data['1'];
    // console.log(data);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    const allDisplayText = Object.values(data)
      // .flatMap((surah) => Object.values(surah))
      .map((ayah) => ayah.displayText)
      .filter((text) => text)
      // .reverse()
      .join(' ');
    // console.log(allDisplayText); // Log the displayText to the console
    res.json({ allDisplayText });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch data from the API',
      details: error.message,
    });
  }
});

const dashboardAPI = 'https://raw.githubusercontent.com/fardanahmed/recite-ml/refs/heads/master/data/data-uthmani.json'; // Predefined API URL

router.get('/dashboard', async (req, res) => {
  try {
    // Fetch data from the external API
    const response = await axios.get(dashboardAPI);
    const { data } = response;
    const dashboardSurahs = data.quran.surahs.map((surah) => ({
      num: surah.num,
      name: surah.name,
    }));
    res.json({ dashboardSurahs });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch data from the API',
      details: error.message,
    });
  }
});

module.exports = router;
