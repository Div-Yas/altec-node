const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const axios = require("axios");
const apiHandler = require("../handler/api-handler");
const { Response } = require("http-status-codez");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(
      new ErrorHandler(
        "Login first to handle this resource",
        Response.HTTP_UNAUTHORIZED
      )
    );
  }
  const serviceResponse = await axios.all([
    apiHandler.getUserInformation(token),
  ]);
  if (serviceResponse !== null) {
    req.user = serviceResponse[0].data.data;
  }
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} is not allowed`,
          Response.HTTP_UNAUTHORIZED
        )
      );
    }
    next();
  };
};
