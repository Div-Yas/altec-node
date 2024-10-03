const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const { format } = require("date-fns");

const distributorStockReportSchema = new mongoose.Schema({
  distributorcode: {
    type: String,
    required: [true, "Please Enter Distributor Code"],
  },
  distributor_name: {
    type: String,
    required: [true, "Please Enter Distributor Name"],
  },
  distributor_br_code: {
    type: String,
    required: [true, "Please Enter Distributor Branch Code"],
  },
  distributor_br_name: {
    type: String,
    required: [true, "Please Enter Distributor Branch Name"],
  },
  godown_name: {
    type: String,
    required: [true, "Please Enter Godown Name"],
  },
  product_code: {
    type: String,
    required: [true, "Please Enter Product Code"],
  },
  product_description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },
  batch: {
    type: String,
    required: [true, "Please Enter Batch"],
  },
  expiry_date: {
    type: Date,
    required: [true, "Please Enter Expiry Date"],
  },
  mrp: {
    type: String,
    required: [true, "Please Enter MRP"],
  },
  purch_price_without: {
    type: String,
    required: [true, "Please Enter Purch Price Without"],
  },
  saleable_stock: {
    type: String,
    required: [true, "Please Enter Saleable Stock"],
  },
  unsaleable_stock: {
    type: String,
    required: [true, "Please Enter Unsaleable Stock"],
  },
  offer_stock: {
    type: String,
    required: [true, "Please Enter Offer Stock"],
  },
  saleable_stock_value: {
    type: String,
    required: [true, "Please Enter Saleable Stock Value"],
  },
  unsaleable_stock_value: {
    type: String,
    required: [true, "Please Enter Unsaleable Stock Value"],
  },
  tot_stock_value: {
    type: String,
    required: [true, "Please Enter Total Stock Value"],
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
distributorStockReportSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    if (ret.expiry_date) {
      ret.expiry_date = format(ret.expiry_date, "dd-MM-yyyy");
      return ret;
    }
  },
});

distributorStockReportSchema.plugin(softDeletePlugin);
module.exports = mongoose.model(
  " altec_distributor_stock_report",
  distributorStockReportSchema
);
