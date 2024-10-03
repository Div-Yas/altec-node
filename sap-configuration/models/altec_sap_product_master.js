const mongoose = require("mongoose");
// const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const sapProductMaster = new mongoose.Schema({
  product_code: {
    type: String,
  },
  serial_number: {
    type: String,
  },
  second_serial_number: {
    type: String,
  },
  stock_coverage_days: {
    type: String,
  },
  product_weight_type: {
    type: String,
  },
  serial_number_application: {
    type: String,
  },
  is_active: {
    type: String,
  },
  shell_life: {
    type: String,
  },
  product_net_weight: {
    type: String,
  },
  is_drug_product: {
    type: String,
  },
  product_name: {
    type: String,
  },
  prod_short_name: {
    type: String,
  },
  product_type: {
    type: String,
  },
  sku_type: {
    type: String,
  },
  company_product_code: {
    type: String,
  },
  product_hier_level_code: {
    type: String,
  },
  product_hier_value_code: {
    type: String,
  },
  product_eancode: {
    type: String,
  },
  hsn_name: {
    type: String,
  },
  hsn_code: {
    type: String,
  },
  division_csintegration: {
    type: String,
  },
  division_csintegration2: {
    type: String,
  },
  brand_cat_csintergration: {
    type: String,
  },
  brand_cat_csintergration2: {
    type: String,
  },
  brand_park_csintergration: {
    type: String,
  },
  brand_park_csintergration2: {
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

// sapProductMaster.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_sap_product_master", sapProductMaster);
