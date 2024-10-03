const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const customerRoute = new mongoose.Schema({
  distributor_code: {
    type: String,
    required: [true, "Please enter a distributor code"],
  },
  distributor_branch_code: {
    type: String,
    required: [true, "Please enter a Distributor Branch Code"],
  },
  customer_code: {
    type: String,
    required: [true, "Please enter a customer code"],
  },
  route_code: {
    type: String,
    required: [true, "Please enter a route code"],
  },
  route_type: {
    type: String,
    required: [true, "Please enter a route type"],
  },
  status: {
    type: Boolean,
    default: "1",
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

customerRoute.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_customer_route", customerRoute);
