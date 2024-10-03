const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const { format } = require("date-fns");

const creditDebitAdjustmentSchema = new mongoose.Schema({
  autoId: {
    type: String,
    required: "Please enter a id",
  },
  customer_code: {
    type: String,
    required: "Please enter a customer code",
  },
  distributor_code: {
    type: String,
    required: "Please enter a distributor code",
  },
  adjustment_ref_no: {
    type: String,
    required: "Please enter an adjustment ref no",
  },
  adjustment_mode: {
    type: String,
    required: "Please enter an adjustment mode",
  },
  actual_amount: {
    type: String,
    required: "Please enter an actual amount",
  },
  current_bill_adjust_amt: {
    type: String,
    required: "Please enter a current bill adjust amt",
  },
  balance: {
    type: String,
    required: "Please enter a balance",
  },
  adjust_amount: {
    type: String,
    required: "Please enter an adjust amount",
  },
  doc_date: {
    type: Date,
    required: "Please enter a doc date",
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
creditDebitAdjustmentSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    if (ret.doc_date) {
      ret.doc_date = format(ret.doc_date, "dd-MM-yyyy");
      return ret;
    }
  },
});
creditDebitAdjustmentSchema.plugin(softDeletePlugin);
module.exports = mongoose.model(
  "altec_credit_debit_adjustment",
  creditDebitAdjustmentSchema
);
