const catchAsync = require('../utils/catchAsync');
const { dashboard } = require('../services/surah.service');

const search = catchAsync(async (req, res) => {
  const response = await dashboard();
  res.send({ response });
});

module.exports = {
  search,
};
