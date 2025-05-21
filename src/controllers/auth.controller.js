const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiResponse = require('../utils/response');
const { authService, userService, tokenService, emailService } = require('../services');
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  return ApiResponse.success(res, { user, tokens }, 'User registered successfully', httpStatus.CREATED);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  return ApiResponse.success(res, { user, tokens }, 'Login successful');
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  return ApiResponse.success(res, null, 'Logout successful', httpStatus.NO_CONTENT);
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  return ApiResponse.success(res, tokens, 'Tokens refreshed successfully');
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  return ApiResponse.success(res, null, 'Password reset email sent', httpStatus.NO_CONTENT);
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  return ApiResponse.success(res, null, 'Password reset successful', httpStatus.NO_CONTENT);
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  return ApiResponse.success(res, null, 'Verification email sent', httpStatus.NO_CONTENT);
});

const verifyEmail = catchAsync(async (req, res) => {
  const { token } = req.query;
  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, '"token" is required');
  }
  await authService.verifyEmail(token);
  return ApiResponse.success(res, null, 'Email verified successfully', httpStatus.NO_CONTENT);
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
