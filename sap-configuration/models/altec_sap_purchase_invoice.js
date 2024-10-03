const mongoose = require("mongoose");
// const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const sapPurchaseInvoiceSchema = new mongoose.Schema({
  comp_inv_no: {
    type: String,
  },
  comp_inv_date: {
    type: Date,
  },
  pur_order_no: {
    type: String,
  },
  supp_code: {
    type: String,
  },
  distr_code: {
    type: String,
  },
  channel_code: {
    type: String,
  },
  grn_number: {
    type: String,
  },
  distr_type: {
    type: String,
  },
  invoice_type: {
    type: String,
  },
  transporter: {
    type: String,
  },
  tot_tax_amt1: {
    type: String,
  },
  tot_tax_amt2: {
    type: String,
  },
  tot_tax_amt3: {
    type: String,
  },
  tot_tax_amt4: {
    type: String,
  },
  tot_tax_amt5: {
    type: String,
  },
  tot_cst_amt1: {
    type: String,
  },
  tot_cst_amt2: {
    type: String,
  },
  tot_cst_amt3: {
    type: String,
  },
  tot_disc_amt: {
    type: String,
  },
  tot_gross_amt: {
    type: String,
  },
  tot_tax_amt: {
    type: String,
  },
  tot_net_amt: {
    type: String,
  },
  message_h: {
    type: String,
  },
  purchase_invoice_details_list: {
    type: Array,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
  },
  approved_date: {
    type: Date,
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
// Change the date format to dd-mm-yyyy while fetching data
// sapPurchaseInvoiceSchema.set("toJSON", {
//   transform: function (doc, ret, opt) {
//     if (ret.comp_inv_date && ret.approved_date) {
//       ret.comp_inv_date = format(ret.comp_inv_date, "dd-MM-yyyy");
//       ret.approved_date = format(ret.approved_date, "dd-MM-yyyy");
//       return ret;
//     }
//   },
// });
// sapPurchaseInvoiceSchema.plugin(softDeletePlugin);
module.exports = mongoose.model(
  "altec_sap_purchase_invoice",
  sapPurchaseInvoiceSchema
);
