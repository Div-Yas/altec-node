const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const sapProductHierarchySchema = new mongoose.Schema({
  prod_hier_lvl_code: {
    type: String,
  },
  company_code: {
    type: String,
  },
  prod_hier_value_code: {
    type: String,
  },
  prod_hier_value_name: {
    type: String,
  },
  report_to_lvl_code: {
    type: String,
  },
  status: {
    type: Boolean,
    default: 1,
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

sapProductHierarchySchema.plugin(softDeletePlugin);
module.exports = mongoose.model(
  "altec_sap_product_hierarchy",
  sapProductHierarchySchema
);
