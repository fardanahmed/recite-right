const axios = require('axios');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const dashboardAPI = 'https://raw.githubusercontent.com/fardanahmed/recite-ml/refs/heads/master/data/data-uthmani.json'; // Predefined API URL

const dashboard = async () => {
  const response = await axios.get(dashboardAPI);
  const { data } = response;
  const dashboardSurahs = data.quran.surahs.map((surah) => ({
    num: surah.num,
    name: surah.name,
  }));

  if (!dashboardSurahs) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Surah not found');
  }
  return dashboardSurahs;
};

const API_URL = 'https://raw.githubusercontent.com/fardanahmed/recite-ml/refs/heads/master/data/data-uthmani.json';

const getSurahById = async (surahId) => {
  try {
    const response = await axios.get(API_URL);
    const { data } = response;
    const surah = data.quran.surahs.find((s) => s.num === surahId);
    if (!surah) {
      throw new Error('Surah not found');
    }
    return surah;
  } catch (error) {
    throw new Error('Error fetching Surah data');
  }
};

module.exports = {
  dashboard,
  getSurahById,
};
