const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const { format } = require("date-fns");

const salesretrunitemSchema = new mongoose.Schema({
  sales_return_id: {
    type: String,
    required: [true, "Please enter a sales return id"],
  },
  product_id: {
    type: String,
    required: [true, "Please enter a product id"],
  },
  product_name: {
    type: String,
    required: [true, "Please enter a product name"],
  },
  sold_quantity: {
    type: String,
    required: [true, "Please enter a sold quantity"],
  },
  return_quantity: {
    type: String,
    required: [true, "Please enter a return quantity"],
  },
  return_type: {
    type: String,
    required: [true, "Please enter a return type"],
  },
  reason: {
    type: String,
    required: [true, "Please enter a reason"],
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

salesretrunitemSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    if (ret.createdat) {
      ret.createdat = format(ret.createdat, "dd-MM-yyyy");
      return ret;
    }
  },
});

salesretrunitemSchema.plugin(softDeletePlugin);
module.exports = mongoose.model(
  "altec_sales_return_item",
  salesretrunitemSchema
);
