const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const sapGeoHierarchy = new mongoose.Schema({
  geovalue_code: {
    type: String,
  },
  geo_level: {
    type: String,
  },
  geo_value_name: {
    type: String,
  },
  reporting_to_level_code: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

sapGeoHierarchy.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_sap_geo_hirerachy", sapGeoHierarchy);
