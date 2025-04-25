const axios = require('axios');

const dashboardAPI = 'https://raw.githubusercontent.com/fardanahmed/recite-ml/refs/heads/master/data/data-uthmani.json'; // Predefined API URL

const dashboard = async () => {
  const response = await axios.get(dashboardAPI);
  const { data } = response;
  const dashboardSurahs = data.quran.surahs.map((surah) => ({
    num: surah.num,
    name: surah.name,
  }));

  return dashboardSurahs;
};

// const API_URL =  'https://raw.githubusercontent.com/fardanahmed/recite-ml/refs/heads/master/data/quran.json';
// const getSurahById = async (surahId) => {
//   try {
//     const response = await axios.get(API_URL);
//     const data = response.data;
//     const surah = data.quran.surahs.find((s) => s.num === surahId);
//     if (!surah) {
//       throw new Error('Surah not found');
//     }
//     return surah;
//   } catch (error) {
//     throw new Error('Error fetching Surah data');
//   }
// };

module.exports = {
  dashboard,
};
