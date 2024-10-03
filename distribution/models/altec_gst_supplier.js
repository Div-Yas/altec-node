const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const GstSupplier = new mongoose.Schema({
  company_code: {
    type: String,
    required: [true, "Please enter a company code"],
  },
  supplier_code: {
    type: String,
    required: [true, "Please enter a supplier code"],
  },
  supplier_name: {
    type: String,
    required: [true, "Please enter a supplier name"],
  },
  gst_state_code: {
    type: String,
    required: [true, "Please enter a gst state code"],
  },
  supplier_gst_in: {
    type: String,
    required: [true, "Please enter a supplier gst in"],
  },
  status: {
    type: String,
    required: [true, "Please enter a status"],
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

GstSupplier.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_gst_supplier", GstSupplier);
