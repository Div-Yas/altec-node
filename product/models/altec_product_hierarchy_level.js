const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const producthierarchylevelSchema = new mongoose.Schema({
  company_code: {
    type: String,
    required: [true, "Please enter a company code"],
  },
  level_code: {
    type: String,
    required: [true, "Please enter a level code"],
  },
  level_name: {
    type: String,
    required: [true, "Please enter a level name"],
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
producthierarchylevelSchema.plugin(softDeletePlugin);
module.exports = mongoose.model(
  "altec_product_hierarchy_level",
  producthierarchylevelSchema
);
