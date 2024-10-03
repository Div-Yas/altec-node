const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const userSchema = new mongoose.Schema({
  companyid: {
    type: String,
    required: [true, "Please enter companyid"],
  },
  username: {
    type: String,
    required: [true, "Please enter username"],
  },
  mobileno: {
    type: String,
    unique: true,
    maxlength: [10, "mobileno cannot exceed 10 digit"],
    minlength: [10, "mobileno cannot exceed 10 digit"],
    required: [true, "Please enter mobileno"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    maxlength: [8, "Password cannot exceed 8 characters"],
    minlength: [8, "Password cannot exceed 8 characters"],
    select: false,
  },
  role: {
    type: String,
  },
  status: {
    type: Boolean,
    default: "1",
  },
  distributor_code: {
    type: String,
    default: null,
  },
  salesman_code: {
    type: String,
    default: null,
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
  createdat: {
    type: Date,
    default: Date.now,
  },
  updatedat: {
    type: Date,
    default: Date.now,
  },
});

// Encrypting password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// If credentials are Vaild generate a JWT Token
const expirationTimeMilliseconds =
  process.env.JWT_EXPIRES_TIME * 60 * 60 * 1000;
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: expirationTimeMilliseconds,
  });
};

// Compare user password
userSchema.methods.isValidPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Generate password reset token
userSchema.methods.getResetToken = function () {
  const token = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;
  return token;
};

userSchema.plugin(softDeletePlugin);
module.exports = mongoose.model("altect_user", userSchema);
