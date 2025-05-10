const catchAsync = require('../utils/catchAsync');
const { dashboard } = require('../services/surah.service');

const searchSurah = catchAsync(async (req, res) => {
  const response = await dashboard();
  res.send({ response });
});

module.exports = {
  searchSurah,
};
