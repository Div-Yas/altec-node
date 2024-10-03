const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const { format } = require("date-fns");

const openingBalance = new mongoose.Schema({
  distributor_code: {
    type: String,
    required: [true, "Please enter a distributor code"],
  },
  distributor_branch_code: {
    type: String,
    required: [true, "Please enter a Distributor Branch Code"],
  },
  coa_code: {
    type: String,
    required: [true, "Please enter a coa code"],
  },
  credit_amount: {
    type: String,
    required: [true, "Please enter a credit amount"],
  },
  debit_amount: {
    type: String,
    required: [true, "Please enter a debit amount"],
  },
  opening_balance_date: {
    type: Date,
    required: [true, "Please enter a opening balance date"],
  },
  status: {
    type: Boolean,
    default: "1",
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
  updatedat: {
    type: Date,
    default: Date.now,
  },
});
openingBalance.set("toJSON", {
  transform: function (doc, ret, opt) {
    if (ret.opening_balance_date) {
      ret.opening_balance_date = format(ret.opening_balance_date, "dd-MM-yyyy");
      return ret;
    }
  },
});
openingBalance.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_opening_balance", openingBalance);
