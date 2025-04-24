const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const dashboardSurah = catchAsync(async (req, res) => {
  const surah = await req.surahService.getSurahById(req.params.surahId);
  if (!surah) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Surah not found' });
  }
  res.status(httpStatus.OK).json(surah);
});

module.exports = {
  dashboardSurah,
};
