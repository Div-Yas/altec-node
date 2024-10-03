const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/altec_user");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const { Response } = require("http-status-codez");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Login first to handle this resource", Response.HTTP_UNAUTHORIZED));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`Role ${req.user.role} is not allowed`, Response.HTTP_UNAUTHORIZED)
      );
    }
    next();
  };
};

