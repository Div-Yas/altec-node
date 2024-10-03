const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const { format } = require("date-fns");

const orderBillingSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: [true, "Please Enter an Order Id"],
  },
  distributor_code: {
    type: String,
    required: [true, "Please Enter a Distributor Code"],
  },
  salesman_code: {
    type: String,
    required: [true, "Please Enter a Salesman Code"],
  },
  route_code: {
    type: String,
    required: [true, "Please Enter a Route Code"],
  },
  customer_code: {
    type: String,
    required: [true, "Please Enter a Customer Code"],
  },
  invoice_no: {
    type: String,
    required: [true, "Please Enter an Invoice No"],
  },
  cash_dist_amt: {
    type: String,
    required: [true, "Please Enter a Cash DistAmt"],
  },
  cash_dist_percent: {
    type: String,
    required: [true, "Please Enter a Cash DistPercent"],
  },
  scheme_dist_amt: {
    type: String,
    required: [true, "Please Enter a Scheme DistAmt"],
  },
  scheme_dist_percent: {
    type: String,
    required: [true, "Please Enter a Scheme DistPercent"],
  },

  total_invoice_qty: {
    type: String,
    required: [true, "Please Enter a Total Invoice Qty"],
  },
  credit_note_adjustment: {
    type: String,
    required: [true, "Please Enter a Credit Note Adjustment"],
  },
  debit_note_adjustment: {
    type: String,
    required: [true, "Please Enter a Debit Note Adjustment"],
  },
  gross_amount: {
    type: String,
    required: [true, "Please Enter a Gross Amount"],
  },
  total_addition: {
    type: String,
    required: [true, "Please Enter a Total Addition"],
  },
  total_deduction: {
    type: String,
    required: [true, "Please Enter a Total Deduction"],
  },
  net_amount: {
    type: String,
    required: [true, "Please Enter a Net Amount"],
  },
  order_date: {
    type: Date,
    required: [true, "Please Enter a Order Date"],
  },
  order_status: {
    type: String,
    required: [true, "Please Enter an Order Status"],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});
orderBillingSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    if (ret.order_date) {
      ret.order_date = format(ret.order_date, "dd-MM-yyyy");
      return ret;
    }
  },
});

orderBillingSchema.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_order_billing", orderBillingSchema);
