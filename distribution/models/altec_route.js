const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const routeSchema = new mongoose.Schema({
  distributor_code: {
    type: String,
    required: [true, "Please enter a distributor code"],
  },
  distributor_branch_code: {
    type: String,
    required: [true, "Please enter a Distributor Branch Code"],
  },
  route_name: {
    type: String,
    required: [true, "Please enter a route name"],
  },
  route_code: {
    type: String,
    required: [true, "Please enter a route code"],
    unique: true,
  },
  is_active: {
    type: String,
    required: [true, "Please enter a is active state"],
  },
  is_van_route: {
    type: String,
    required: [true, "Please enter a is van route"],
  },
  population: {
    type: String,
    required: [true, "Please enter a population"],
  },
  distance: {
    type: String,
    required: [true, "Please enter a distance"],
  },
  route_type: {
    type: String,
    required: [true, "Please enter a route type"],
  },
  city: {
    type: String,
    required: [true, "Please enter a city"],
  },
  local_upcountry: {
    type: String,
    required: [true, "Please enter a local upcountry"],
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

routeSchema.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_route", routeSchema);
