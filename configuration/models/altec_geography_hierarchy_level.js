const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const geographyHiearchyLevelSchema = new mongoose.Schema({
  company_code: {
    type: String,
    required: [true, "Please enter a company code"],
  },
  level_name: {
    type: String,
    required: [true, "Please enter a level name"],
  },
  level_code: {
    type: String,
    required: [true, "Please enter a level code"],
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

geographyHiearchyLevelSchema.plugin(softDeletePlugin);
module.exports = mongoose.model(
  "altec_geography_hierarchy_level",
  geographyHiearchyLevelSchema
);
