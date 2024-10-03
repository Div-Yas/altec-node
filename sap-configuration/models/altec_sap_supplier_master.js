const mongoose = require("mongoose");

const sapSupplierMasterSchema = new mongoose.Schema({
  company_code: {
    type: String,
  },
  supplier_code: {
    type: String,
  },
  name: {
    type: String,
  },
  address1: {
    type: String,
  },
  address2: {
    type: String,
  },
  address3: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  postal_code: {
    type: String,
  },
  phone: {
    type: String,
  },
  email_id: {
    type: String,
  },
  tin_no: {
    type: String,
  },
  pin_no: {
    type: String,
  },
  contact_person: {
    type: String,
  },
  default_supplier: {
    type: String,
  },
  geo_hier_level_code: {
    type: String,
  },
  geo_hier_value_code: {
    type: String,
  },
  supplier_gstin: {
    type: String,
  },
  gst_state_code: {
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
  "altec_sap_supplier_master",
  sapSupplierMasterSchema
);
