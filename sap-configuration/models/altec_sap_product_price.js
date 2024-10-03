const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const sapProductPrice = new mongoose.Schema({
  prod_code: {
    type: String,
  },
  prod_batch_code: {
    type: String,
  },
  manf_dt: {
    type: String,
  },
  expiry_dt: {
    type: String,
  },
  is_active: {
    type: String,
  },
  batch_dt: {
    type: String,
  },
  effective_from_date: {
    type: String,
  },
  dis_price_list: {
    type: String,
  },
  craeted_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

sapProductPrice.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_sap_product_price", sapProductPrice);
