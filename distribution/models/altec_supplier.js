const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const supplierSchema = new mongoose.Schema({
  auto_id: {
    type: String,
    required: [true, "Please enter a auto id"],
  },
  company: {
    type: String,
    required: [true, "Please enter a company"],
  },
  town_code: {
    type: String,
  },
  gst_state_name: {
    type: String,
    required: [true, "Please enter a gst state name"],
  },
  supplier_code: {
    type: String,
    required: [true, "Please enter a supplier code"],
  },
  supplier_name: {
    type: String,
    required: [true, "Please enter a supplier name"],
  },
  s_address_1: {
    type: String,
    required: [true, "Please enter a s address 1"],
  },
  s_address_2: {
    type: String,
    required: [true, "Please enter a s address 2"],
  },
  s_address_3: {
    type: String,
    required: [true, "Please enter a s address 3"],
  },
  country: {
    type: String,
    required: [true, "Please enter a country"],
  },
  state: {
    type: String,
    required: [true, "Please enter a state"],
  },
  city: {
    type: String,
    required: [true, "Please enter a city"],
  },
  postal_code: {
    type: String,
    required: [true, "Please enter a postal code"],
  },
  geo_hierarchy_level: {
    type: String,
    required: [true, "Please enter a geo hierarchy level"],
  },
  geo_hierarchy_value: {
    type: String,
    required: [true, "Please enter a geo hierarchy value"],
  },
  phone_no: {
    type: String,
    required: [true, "Please enter a phone no"],
  },
  contact_person: {
    type: String,
    required: [true, "Please enter a contact person"],
  },
  email_id: {
    type: String,
    required: [true, "Please enter a s email id"],
  },
  tin_no: {
    type: String,
    required: [true, "Please enter a tin no"],
  },
  pin_no: {
    type: String,
    required: [true, "Please enter a pin no"],
  },
  created_by: {
    type: String,
  },
  modified_by: {
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

supplierSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    if (ret.dl_expiry_date) {
      ret.dl_expiry_date = format(ret.dl_expiry_date, "dd-MM-yyyy");
      return ret;
    }
  },
});

supplierSchema.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_supplier", supplierSchema);
