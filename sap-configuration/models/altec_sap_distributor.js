const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const sapDistributorSchema = new mongoose.Schema({
  company_code: {
    type: String,
  },
  distributor_code: {
    type: String,
  },
  distr_name: {
    type: String,
  },
  distributor_status: {
    type: String,
  },
  geo_hier_lvl_code: {
    type: String,
  },
  geo_hier_value_code: {
    type: String,
  },
  sales_hier_lvl_code: {
    type: String,
  },
  supply_chain_lvl_code: {
    type: String,
  },
  gst_tin_number: {
    type: String,
  },
  gst_state_code: {
    type: String,
  },
  gst_distributor_typ: {
    type: String,
  },
  pan_number: {
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
  city_code: {
    type: String,
  },
  state_code: {
    type: String,
  },
  country_code: {
    type: String,
  },
  contact_person: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  postal_code: {
    type: String,
  },
  email_id: {
    type: String,
  },
  distributor_channel_code: {
    type: String,
  },
  distributor_type: {
    type: String,
  },
  distributor_category_code: {
    type: String,
  },
  default_supplier_code: {
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

sapDistributorSchema.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_sap_distributor", sapDistributorSchema);
