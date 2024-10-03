const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const sapProductTax = new mongoose.Schema({
  product_code: {
    type: String,
  },
  tax_state: {
    type: String,
  },
  tax_type: {
    type: String,
  },
  tax_code: {
    type: String,
  },
  tax_date: {
    type: String,
  },
  created_at: {
    type: String,
  },
  updated_at: {
    type: String,
  },
});

sapProductTax.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_sap_product_tax", sapProductTax);
