const mongoose = require("mongoose");
const validator = require("validator");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const { format } = require("date-fns");

const distributorSchema = new mongoose.Schema({
  distributor_code: {
    type: String,
    required: [true, "Please enter a distributor code"],
    unique: true,
  },
  distributor_name: {
    type: String,
    required: [true, "Please enter a distributor name"],
  },
  distributor_type: {
    type: String,
    required: [true, "Please enter a distributor type"],
  },
  parent_code: {
    type: String,
    required: [true, "Please enter a parent code"],
  },
  supplier: {
    type: String,
    required: [true, "Please enter a supplier"],
  },
  discount_based_on: {
    type: String,
    required: [true, "Please enter a discount based on"],
  },
  distributor_permission: {
    type: Array,
    required: [true, "Please enter a distributor permission"],
  },
  status: {
    type: String,
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
  phone_no: {
    type: String,
    maxlength: [10, "phone_no cannot exceed 10 digit"],
    minlength: [10, "phone_no cannot exceed 10 digit"],
    required: [true, "Please enter a phone no"],
  },
  email_id: {
    type: String,
    required: [true, "Please enter a email id"],
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  fssai_no: {
    type: String,
  },
  drug_licence_no: {
    type: String,
  },
  dl_expiry_date: {
    type: Date,
  },
  weekly_off: {
    type: Array,
    required: [true, "Please enter a weekly off"],
  },
  channel_code: {
    type: String,
    required: [true, "Please enter a channel code"],
  },
  category_type: {
    type: String,
    required: [true, "Please enter a category type"],
  },
  numofsalesmans: {
    type: String,
    required: [true, "Please enter a numofsalesmans"],
  },
  salary_budget: {
    type: String,
    required: [true, "Please enter a salary budget"],
  },
  latitude: {
    type: String,
    required: [true, "Please enter a latitude"],
  },
  longitude: {
    type: String,
    required: [true, "Please enter a longitude"],
  },
  geo_hierarchy_level: {
    type: String,
    required: [true, "Please enter a geo hierarchy level"],
  },
  geo_hierarchy_value: {
    type: String,
    required: [true, "Please enter a geo hierarchy value"],
  },
  sales_hierarchy_level: {
    type: String,
    required: [true, "Please enter a sales hierarchy level"],
  },
  lob: {
    type: String,
    required: [true, "Please enter a lob"],
  },
  sales_hierarchy_value: {
    type: String,
    required: [true, "Please enter a sales hierarchy value"],
  },
  gst_state_name: {
    type: String,
    required: [true, "Please enter a gst state name"],
  },
  pan_no: {
    type: String,
    required: [true, "Please enter a pan no"],
  },
  gstin_number: {
    type: String,
    required: [true, "Please enter a gstin number"],
  },
  aadhar_no: {
    type: String,
  },
  tcs_applicable: {
    type: String,
    required: [true, "Please enter a tcs applicable"],
  },
  gst_distributor: {
    type: String,
    required: [true, "Please enter a gst distributor"],
  },
  tds_applicable: {
    type: String,
    required: [true, "Please enter a tds applicable"],
  },
  created_by: {
    type: String,
    required: [true, "Please enter a created by"],
  },
  modified_by: {
    type: String,
  },
  password: {
    type: String,
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
  updateddat: {
    type: Date,
    default: Date.now,
  },
});

distributorSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    if (ret.dl_expiry_date) {
      ret.dl_expiry_date = format(ret.dl_expiry_date, "dd-MM-yyyy");
      return ret;
    }
  },
});
distributorSchema.virtual("expiry_date").get(function () {
  return this.dl_expiry_date ? format(this.dl_expiry_date, "yyyy-MM-dd") : null;
});
distributorSchema.set("toJSON", {
  virtuals: true,
});

distributorSchema.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_distributor", distributorSchema);
