const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const geographyHiearchyLevelValueSchema = new mongoose.Schema({
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
  company_value: {
    type: String,
    required: [true, "Please enter a company value"],
  },
  reporting_to: {
    type: String,
    required: [true, "Please enter a reporting to"],
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

geographyHiearchyLevelValueSchema.plugin(softDeletePlugin);
module.exports = mongoose.model(
  "altec_geography_hierarchy_level_value",
  geographyHiearchyLevelValueSchema
);
