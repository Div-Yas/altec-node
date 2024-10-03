const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const { format } = require("date-fns");

const salesmanJCRouteMapping = new mongoose.Schema({
  distributor_code: {
    type: String,
    required: "Please enter a distributor code",
  },
  customer_code: {
    type: String,
    required: "Please enter a customer code",
  },
  salesman_code: {
    type: String,
    required: "Please enter a salesman code",
  },
  route_code: {
    type: String,
    required: "Please enter a route code",
  },
  jc_month: {
    type: String,
    required: "Please enter a jc month",
  },
  frequency: {
    type: String,
    required: "Please enter a frequency",
  },
  daily: {
    type: String,
    default: null,
  },
  weekly: {
    type: String,
    default: null,
  },
  monthly: {
    type: Date,
    default: null,
  },
  status: {
    type: Boolean,
    default: 1,
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
salesmanJCRouteMapping.set("toJSON", {
  transform: function (doc, ret, opt) {
    if (ret.monthly) {
      ret.monthly = format(ret.monthly, "dd-MM-yyyy");
      return ret;
    }
  },
});
salesmanJCRouteMapping.plugin(softDeletePlugin);
module.exports = mongoose.model(
  "altec_salesman_jc_route_mapping",
  salesmanJCRouteMapping
);
