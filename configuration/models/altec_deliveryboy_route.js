const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const deliveryBoyRoute = new mongoose.Schema({
  distributor_code: {
    type: String,
    required: [true, "Please enter a distributor code"],
  },
  distributor_branch_code: {
    type: String,
    required: [true, "Please enter a Distributor Branch Code"],
  },
  deliveryboy_code: {
    type: String,
    required: [true, "Please enter a deliveryboy code"],
  },
  route_code: {
    type: String,
    required: [true, "Please enter a route code"],
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

deliveryBoyRoute.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_deliveryboy_route", deliveryBoyRoute);
