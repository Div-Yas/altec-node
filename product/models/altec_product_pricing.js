const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const productPricing = new mongoose.Schema({
  batch_code: {
    type: String,
  },
  distributor: {
    type: String,
  },
  dist_type_from: {
    type: String,
  },
  dist_type_to: {
    type: String,
  },
  product_code: {
    type: String,
  },
  batch_creation_date: {
    type: Date,
  },
  manufactured_date: {
    type: Date,
  },
  expiry_date: {
    type: Date,
  },
  effective_from_date: {
    type: Date,
  },
  purchase_rate: {
    type: String,
  },
  selling_rate: {
    type: String,
  },
  mrp: {
    type: String,
  },
  created_by: {
    type: String,
  },
  modified_by: {
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
productPricing.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_product_pricing", productPricing);
