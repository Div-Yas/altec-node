const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const orderItem = new mongoose.Schema({
  order_id: {
    type: String,
    required: [true, "Please enter a order id"],
  },
  product_id: {
    type: String,
  },
  product_name: {
    type: String,
    required: [true, "Please enter a product name"],
  },
  quantity: {
    type: String,
    required: [true, "Please enter a quantity"],
  },
  ptr: {
    type: String,
    required: [true, "Please enter a ptr"],
  },
  tentative_discount: {
    type: String,
    required: [true, "Please enter a tentative discount"],
  },
  tax_percentage: {
    type: String,
    required: [true, "Please enter a tax percentage"],
  },
  tentative_line_value: {
    type: String,
    required: [true, "Please enter a tentative line value"],
  },
  quantity_type: {
    type: String,
    required: [true, "Please enter a quantity type"],
  },
  scheme_id: {
    type: String,
    required: [true, "Please enter a scheme id"],
  },
  status: {
    type: String,
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

orderItem.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_order_item", orderItem);
