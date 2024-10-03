const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const sapSalesHierarchy = new mongoose.Schema({
  sales_level: {
    type: String,
  },
  sales_value_code: {
    type: String,
  },
  sales_value_name: {
    type: String,
  },
  reporting_to_code: {
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

sapSalesHierarchy.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_sap_sales_hierarchy", sapSalesHierarchy);
