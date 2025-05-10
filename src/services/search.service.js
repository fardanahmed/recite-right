const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const surahs = require('../components/surahs');

const searchService = () => {
  const surahData = {};
  // console.log('Surahs:', surahs['default']['1']);

  for (let surah = 78; surah <= 114; surah += 1) {
    const surahKey = surah.toString();
    if (surahs[surahKey]) {
      surahData[surahKey] = {
        latin: surahs[surahKey].latin,
      };
    }
  }

  if (Object.keys(surahData).length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Error fetching Surah');
  }
  return surahData;
};

module.exports = {
  searchService,
};
