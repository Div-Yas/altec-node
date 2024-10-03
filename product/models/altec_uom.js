const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const uomSchema = new mongoose.Schema({
  uom_code: {
    type: String,
    required: [true, "Please enter a uom code"],
  },
  uom_name: {
    type: String,
    required: [true, "Please enter a uom name"],
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
uomSchema.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_uom", uomSchema);
