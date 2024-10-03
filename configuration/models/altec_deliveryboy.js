const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const deliveryBoy = new mongoose.Schema({
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
  deliveryboy_name: {
    type: String,
    required: [true, "Please enter a deliveryboy name"],
  },
  phone_no: {
    type: String,
    required: [true, "Please enter a Phone no"],
  },
  email_id: {
    type: String,
    required: [true, "Please enter a Email id"],
  },
  daily_allowance: {
    type: String,
    required: [true, "Please enter a daily allowance"],
  },
  salary: {
    type: String,
    required: [true, "Please enter a salary"],
  },
  default_status: {
    type: String,
    required: [true, "Please enter a default status"],
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

deliveryBoy.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_deliveryboy", deliveryBoy);
