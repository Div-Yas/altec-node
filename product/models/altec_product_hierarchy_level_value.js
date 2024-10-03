const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const producthierarchylevelvalueSchema = new mongoose.Schema({
  company_code: {
    type: String,
    required: [true, "Please enter a company code"],
  },
  level_name: {
    type: String,
    required: [true, "Please enter a level name"],
  },
  level_value_code: {
    type: String,
    required: [true, "Please enter a level value code"],
  },
  level_value_name: {
    type: String,
    required: [true, "Please enter a level value name"],
  },
  reporting_level_name: {
    type: String,
    required: [true, "Please enter a reporting level name"],
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
producthierarchylevelvalueSchema.plugin(softDeletePlugin);
module.exports = mongoose.model(
  "altec_product_hierarchy_level_value",
  producthierarchylevelvalueSchema
);
