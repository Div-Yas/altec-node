const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const { format } = require("date-fns");

const salesretrunSchema = new mongoose.Schema({
  sales_return_id: {
    type: String,
    required: [true, "Please enter a sales return id"],
  },
  reference: {
    type: String,
    required: [true, "Please enter a reference"],
  },
  invoice: {
    type: String,
    required: [true, "Please enter a invoice"],
  },
  invoice_no: {
    type: String,
    required: [true, "Please enter a invoice no"],
  },
  distributor_code: {
    type: String,
    required: [true, "Please enter a distributor code"],
  },
  salesman_code: {
    type: String,
    required: [true, "Please enter a salesman code"],
  },
  customer_code: {
    type: String,
    required: [true, "Please enter a customer code"],
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

salesretrunSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    if (ret.createdat) {
      ret.createdat = format(ret.createdat, "dd-MM-yyyy");
      return ret;
    }
  },
});

salesretrunSchema.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_sales_return", salesretrunSchema);
