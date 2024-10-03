const mongoose = require("mongoose");
// const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const { format } = require("date-fns");

const salesmanMarketVisitSchema = new mongoose.Schema({
  auto_id: {
    type: String,
  },
  sa_id: {
    type: String,
  },
  salesman_code: {
    type: String,
  },
  customer_code: {
    type: String,
  },
  start_time: {
    type: String,
  },
  end_time: {
    type: String,
  },
  current_market_hours: {
    type: String,
  },
  no_sale_reason: {
    type: String,
  },
  date: {
    type: Date,
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
salesmanMarketVisitSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    if (ret.date) {
      ret.date = format(ret.date, "dd-MM-yyyy");
      return ret;
    }
  },
});

// salesmanMarketVisitSchema.plugin(softDeletePlugin);
module.exports = mongoose.model(
  "altec_salesman_marketvisit_attendance",
  salesmanMarketVisitSchema
);
