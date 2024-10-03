const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const { format } = require("date-fns");

const salesmanAttendanceSchema = new mongoose.Schema({
  salesman_code: {
    type: String,
    required: [true, "Please enter a Salesman code"],
  },
  start_time: {
    type: String,
    default: "00:00:00",
  },
  end_time: {
    type: String,
    default: "00:00:00",
  },
  date: {
    type: Date,
    required: [true, "Please enter a date"],
  },
  attendance_type: {
    type: String,
    required: [true, "Please enter a attendance type"],
  },
  reason: {
    type: String,
    required: [true, "Please enter a reason"],
  },
  remark: {
    type: String,
  },
  total_login_hours: {
    type: String,
    default: "00:00:00",
  },
  total_market_hours: {
    type: String,
    default: "00:00:00",
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
salesmanAttendanceSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    if (ret.date) {
      ret.date = format(ret.date, "dd-MM-yyyy");
      return ret;
    }
  },
});

salesmanAttendanceSchema.plugin(softDeletePlugin);
module.exports = mongoose.model(
  "altec_salesman_attendance",
  salesmanAttendanceSchema
);
