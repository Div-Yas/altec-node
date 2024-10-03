const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const sapTaxMaster = new mongoose.Schema({
  tax_state: {
    type: String,
  },
  tax_type: {
    type: String,
  },
  tax_code: {
    type: String,
  },
  description: {
    type: String,
  },
  select_gst: {
    type: String,
  },
  is_union_territory_flag: {
    type: String,
  },
  input_perc_cgst: {
    type: String,
  },
  input_apply_on_cgst: {
    type: String,
  },
  output_perc_cgst: {
    type: String,
  },
  output_apply_ov_cgst: {
    type: String,
  },
  select_sgst_utgst: {
    type: String,
  },
  input_perc_sgst: {
    type: String,
  },
  input_apply_on_sgst: {
    type: String,
  },
  output_perc_sgst: {
    type: String,
  },
  output_apply_on_sgst: {
    type: String,
  },
  select_igst: {
    type: String,
  },
  input_perc_igst: {
    type: String,
  },
  input_apply_on_igst: {
    type: String,
  },
  output_perc_igst: {
    type: String,
  },
  output_apply_on_igst: {
    type: String,
  },
  select_atax: {
    type: String,
  },
  input_perc_atax: {
    type: String,
  },
  output_perc_atax: {
    type: String,
  },
  select_cess: {
    type: String,
  },
  input_perc_cess: {
    type: String,
  },
  input_apply_on_cess: {
    type: String,
  },
  output_perc_cess: {
    type: String,
  },
  output_apply_on_cess: {
    type: String,
  },
  scheme_discount: {
    type: String,
  },
  cash_discount: {
    type: String,
  },
  db_discount: {
    type: String,
  },
  tax_date: {
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

sapTaxMaster.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_sap_tax_master", sapTaxMaster);
