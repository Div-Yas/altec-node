const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const salesmanDistributorMapping = new mongoose.Schema({
  salesman_code: {
    type: String,
    required: [true, "Please enter a salesman code"],
  },
  distributor_code: {
    type: String,
    required: [true, "Please enter a distributor code"],
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

salesmanDistributorMapping.plugin(softDeletePlugin);
module.exports = mongoose.model(
  "salesman_distributor_mapping",
  salesmanDistributorMapping
);
