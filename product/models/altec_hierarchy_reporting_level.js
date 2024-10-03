const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const hierarchyReportingLevelSchema = new mongoose.Schema({
  company_id: {
    type: String,
    required: [true, "Please enter a level code"],
  },
  hierarchy_level_id: {
    type: String,
    required: [true, "Please enter a level name"],
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

hierarchyReportingLevelSchema.plugin(softDeletePlugin);
module.exports = mongoose.model(
  "altec_hierarchy_reporting_level",
  hierarchyReportingLevelSchema
);
