const mongoose = require("mongoose");
// const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const gstStateMastersSchema = new mongoose.Schema({
  gst_state_code: {
    type: String,
    required: [true, "Please enter a gst state code"],
  },
  gst_state_name: {
    type: String,
    required: [true, "Please enter a gst state name"],
  },
  is_union_territory: {
    type: String,
    required: [true, "Please enter a is union territory"],
  },
  is_gst_enabled: {
    type: String,
    required: [true, "Please enter a is gst enabled"],
  },
  status: {
    type: Boolean,
    default: true,
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
// gstStateMastersSchema.plugin(softDeletePlugin);

module.exports = mongoose.model(
  "altec_gst_state_masters",
  gstStateMastersSchema
);
