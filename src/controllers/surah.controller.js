// const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/response');
const httpStatus = require('http-status');
const { dashboard, getSurahById } = require('../services/surah.service');

// const dashboardSurah = catchAsync(async (req, res) => {
//   const surah = await req.surahService.getSurahById(req.params.surahId);
//   if (!surah) {
//     return res.status(httpStatus.NOT_FOUND).json({ message: 'Surah not found' });
//   }
//   res.status(httpStatus.OK).json(surah);
// });

const dashboardSurah = catchAsync(async (req, res) => {
  const response = await dashboard();
  if (!response) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dashboard data not found');
  }
  return ApiResponse.success(res, response);
});

const SurahById = catchAsync(async (req, res) => {
  const { surahId } = req.params;
  const surah = await getSurahById(surahId);
  if (!surah) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Surah not found');
  }
  return ApiResponse.success(res, surah);
});

module.exports = {
  dashboardSurah,
  SurahById,
};
