const mongoose = require("mongoose");

const sapApprovedProductSchema = new mongoose.Schema({
  invoice_number: {
    type: String,
  },
  bill_no: {
    type: String,
  },
  product_id: {
    type: String,
  },
  product_name: {
    type: String,
  },
  quantity: {
    type: String,
  },
  status: {
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

module.exports = mongoose.model(
  "altec_sap_approved_product",
  sapApprovedProductSchema
);
