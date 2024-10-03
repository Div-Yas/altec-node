const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/altec_user");
const sendToken = require("../utils/jwt");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const { Response } = require("http-status-codez");
const Validator = require("validatorjs");

// Register User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const data = await User.create(req.body);
  const msg = "Register successfully!";
  sendToken(data, Response.HTTP_CREATED, res, msg);
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { mobileno, password } = req.body;
  const validationRule = new Validator(req.body, {
    mobileno: "required",
    password: "required",
  });
  if (validationRule.fails()) {
    return res.status(Response.HTTP_UNPROCESSABLE_ENTITY).send({
      status: false,
      message: "Validation failed",
      data: validationRule.errors.errors,
    });
  }
  const user = await User.findOne({ mobileno }).select("+password");
  if (!user || !(await user.isValidPassword(password))) {
    return next(
      new ErrorHandler(
        "Invalid mobile number or password",
        Response.HTTP_UNPROCESSABLE_ENTITY
      )
    );
  }
  sendToken(user, Response.HTTP_OK, res, "Login successfully!");
});

// Logout User
exports.logoutUser = catchAsyncError((req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(Response.HTTP_OK)
    .send({
      status: true,
      message: "Loggedout",
      data: [],
    });
});

//get user details
exports.fetchUser = catchAsyncError(async (req, res, next) => {
  const token = req.params.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const data = await User.findById(decoded.id);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: data,
  });
});

//User register
exports.userRegister = catchAsyncError(async (req, res) => {
  const user = await User.create(req.body);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: user,
  });
});
