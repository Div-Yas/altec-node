const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const orderSchema = new mongoose.Schema({
  salesman_code: {
    type: String,
    required: [true, "Please enter a salesman code"],
  },
  customer_code: {
    type: String,
    required: [true, "Please enter a customer code"],
  },
  distributor_code: {
    type: String,
    required: [true, "Please enter a distributor code"],
  },
  order_id: {
    type: String,
    required: [true, "Please enter a order id"],
  },
  signature: {
    type: String,
  },
  total_amount: {
    type: String,
    required: [true, "Please enter a total amount"],
  },
  tax_amount: {
    type: String,
    required: [true, "Please enter a tax amount"],
  },
  discount: {
    type: String,
  },
  order_bill_id: {
    type: String,
  },
  invoice_pdf: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Declined"],
    default: "Pending",
  },
  queue: {
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

orderSchema.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_order", orderSchema);
