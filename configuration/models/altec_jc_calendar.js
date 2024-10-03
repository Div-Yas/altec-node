const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const { format } = require("date-fns");

const jcCalendarSchema = new mongoose.Schema({
  fin_year: {
    type: String,
    required: [true, "Please enter a year"],
  },
  from_date: {
    type: Date,
    required: [true, "Please enter a from date"],
  },
  to_date: {
    type: Date,
    required: [true, "Please enter a to date"],
  },
  jc: {
    type: String,
    required: [true, "Please enter a jc"],
  },
  jc_week: {
    type: String,
    required: [true, "Please enter a jc week"],
  },
  cal_week: {
    type: String,
    required: [true, "Please enter a cal week"],
  },
  jc_week_num: {
    type: String,
    required: [true, "Please enter a jc week number"],
  },
  qtr: {
    type: String,
    required: [true, "Please enter a qtr"],
  },
  hy: {
    type: String,
    required: [true, "Please enter a hy"],
  },
  jc_num: {
    type: String,
    required: [true, "Please enter a jc number"],
  },
  division: {
    type: String,
    required: [true, "Please enter a division"],
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
jcCalendarSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    if (ret.from_date && ret.to_date) {
      ret.from_date = format(ret.from_date, "dd-MM-yyyy");
      ret.to_date = format(ret.to_date, "dd-MM-yyyy");
      return ret;
    }
  },
});
jcCalendarSchema.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_jc_calendar", jcCalendarSchema);
