const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const { format } = require("date-fns");

const orderBillingItemSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: [true, "please enter an order id"],
  },
  product_code: {
    type: String,
    required: [true, "please enter a product code"],
  },
  product_name: {
    type: String,
    required: [true, "please enter a product name"],
  },
  batch: {
    type: String,
    required: [true, "please enter a batch"],
  },
  exp_date: {
    type: Date,
    required: [true, "please enter an exp date"],
  },
  order: {
    type: String,
    required: [true, "please enter an order"],
  },
  order_qty: {
    type: String,
    required: [true, "please enter an order qty"],
  },
  inv_qty: {
    type: String,
    required: [true, "please enter an inv qty"],
  },
  mrp: {
    type: String,
    required: [true, "please enter a mrp"],
  },
  sell_rate: {
    type: String,
    required: [true, "please enter a sell rate"],
  },
  gross_amt: {
    type: String,
    required: [true, "please enter a gross amt"],
  },
  line_disc_amt: {
    type: String,
    required: [true, "please enter a line disc amt"],
  },
  tax_amt: {
    type: String,
    required: [true, "please enter a tax amt"],
  },
  net_rate: {
    type: String,
    required: [true, "please enter a net rate"],
  },
  net_amt: {
    type: String,
    required: [true, "please enter a net amt"],
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
orderBillingItemSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    if (ret.exp_date) {
      ret.exp_date = format(ret.exp_date, "dd-MM-yyyy");
      return ret;
    }
  },
});

orderBillingItemSchema.plugin(softDeletePlugin);
module.exports = mongoose.model(
  "altec_order_billing_item",
  orderBillingItemSchema
);
