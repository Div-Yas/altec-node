const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const targetUploadSchema = mongoose.Schema({
  employee_code: {
    type: String,
    required: [true, "Please enter employee code"],
  },
  jc_period: {
    type: String,
    required: [true, "Please enter jc period"],
  },
  target_amount: {
    type: String,
    required: [true, "Please enter target amount"],
  },
  role_type: {
    type: String,
    required: [true, "Please enter role type"],
  },
  created_by: {
    type: String,
    required: [true, "Please enter created by"],
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
  updatedat: {
    type: Date,
    default: Date.now,
  },
});

targetUploadSchema.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_target_uploads", targetUploadSchema);
