const catchAsync = require('../utils/catchAsync');
const { searchService } = require('../services/search.service');

const search = catchAsync(async (req, res) => {
  const response = await searchService();
  res.send({ response });
});

module.exports = {
  search,
};
