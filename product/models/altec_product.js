const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const productSchema = new mongoose.Schema({
  phll: {
    type: String,
    required: [true, "Please enter a PHLL"],
  },
  product_code: {
    type: String,
    required: [true, "Please enter a Product Code"],
    unique: true,
  },
  product_name: {
    type: String,
    required: [true, "Please enter a Product Name"],
  },
  short_name: {
    type: String,
    required: [true, "Please enter a Short Name"],
  },
  uom: {
    type: String,
    required: [true, "Please enter a UOM"],
  },
  conversion_factor: {
    type: Number,
    required: [true, "Please enter a Conversion Factor"],
  },
  ean_code: {
    type: String,
  },
  net_wgt: {
    type: Number,
  },
  weight_type: {
    type: String,
  },
  shelf_life: {
    type: Number,
  },
  product_type: {
    type: String,
  },
  drug_product: {
    type: String,
  },
  status: {
    type: String,
  },
  serial_no_exist: {
    type: String,
  },
  second_serial_no_applicable: {
    type: String,
  },
  second_serial_no_mandatory: {
    type: String,
  },
  ghl: {
    type: String,
    required: [true, "Please enter a GHL"],
  },
  hsn_code: {
    type: String,
    required: [true, "Please enter a HSN Code"],
  },
  hsn_name: {
    type: String,
    required: [true, "Please enter a HSN Name"],
  },
  gst_p_type: {
    type: String,
    required: [true, "Please enter a GST P Type"],
  },
  brandcategory: {
    type: String,
  },
  brandpack: {
    type: String,
  },
  division: {
    type: String,
  },
  mrp: {
    type: String,
  },
  ptr: {
    type: String,
  },
  available_quantity: {
    type: Number,
  },
  sku_type: {
    type: String,
  },
  sih: {
    type: String,
  },
  soq: {
    type: String,
  },
  mss: {
    type: String,
  },
  created_by: {
    type: String,
  },
  modified_by: {
    type: String,
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

productSchema.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_product", productSchema);
