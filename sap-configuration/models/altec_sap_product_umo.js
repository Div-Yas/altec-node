const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const sapProductUmo = new mongoose.Schema({
  product_code: {
    type: String,
  },
  umo_list: {
    type: String,
  },
  created_at: {
    type: String,
  },
  updated_at: {
    type: String,
  },
});

sapProductUmo.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_sap_product_umo", sapProductUmo);
