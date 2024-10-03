const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const { format } = require("date-fns");

const customerGeneralSchema = new mongoose.Schema({
  cg_distributor_branch: {
    type: String,
    required: [true, "Please select a Distributor Branch"],
  },
  cg_type: {
    type: String,
    required: [true, "Please select a Type"],
  },
  cg_customer_code: {
    type: String,
  },
  cg_dist_cust_code: {
    type: String,
  },
  cg_cmpny_cust_code: {
    type: String,
    required: [true, "Please enter a Company Customer Code"],
  },
  cg_salesman_code: {
    type: String,
    required: [true, "Please enter a Salesman Code"],
  },
  cg_customer_name: {
    type: String,
    required: [true, "Please enter a Customer Name"],
  },
  cg_address_1: {
    type: String,
    required: [true, "Please enter a Address 1"],
  },
  cg_address_2: {
    type: String,
    required: [true, "Please enter a Address 2"],
  },
  cg_address_3: {
    type: String,
    required: [true, "Please enter a Address 3"],
  },
  cg_country: {
    type: String,
    required: [true, "Please enter a Country"],
  },
  cg_state: {
    type: String,
    required: [true, "Please enter a State"],
  },
  cg_city: {
    type: String,
    required: [true, "Please enter a City"],
  },
  cg_town: {
    type: String,
    // required: [true, "Please enter a Town"],
  },
  cg_postal_code: {
    type: String,
    required: [true, "Please enter a Postal Code"],
  },
  cg_phoneno: {
    type: String,
    required: [true, "Please enter a Phone No"],
  },
  cg_mobile: {
    type: String,
    required: [true, "Please enter a Mobile No"],
  },
  cg_latitude: {
    type: String,
    required: [true, "Please enter a Latitude"],
  },
  cg_longitude: {
    type: String,
    required: [true, "Please enter a Longitude"],
  },
  ca_customer_status: {
    type: String,
  },
  ca_approval_status: {
    type: String,
  },
  cg_distance: {
    type: String,
  },
  cg_dob: {
    type: Date,
  },
  cg_anniversary: {
    type: String,
  },
  cg_enrollment_date: {
    type: Date,
  },
  cg_contact_person: {
    type: String,
  },
  cg_email_id: {
    type: String,
  },
  cg_gst_state: {
    type: String,
  },
  cg_retailer_type: {
    type: String,
    required: [true, "Please enter a Retailer Type"],
  },
  cg_pan_type: {
    type: String,
    required: [true, "Please enter a PAN Type"],
  },
  cg_pan_no: {
    type: String,
    required: [true, "Please enter a PAN No"],
  },
  cg_aadhaar_no: {
    type: String,
  },
  cg_gstin_number: {
    type: String,
    required: [true, "Please enter a GSTIN Number"],
  },
  cg_tcs_applicable: {
    type: String,
  },
  cg_related_party: {
    type: String,
  },
  cg_composite: {
    type: String,
  },
  cg_tds_applicable: {
    type: String,
  },
  otp: {
    type: String,
  },
  otp_status: {
    type: Boolean,
    default: 1,
  },
  cg_billType: {
    type: String,
    default: "Unbilled",
  },
  created_by: {
    type: String,
  },
  modified_by: {
    type: String,
  },
  createdat: {
    type: String,
    default: Date.now,
  },
  updatedat: {
    type: String,
    default: Date.now,
  },
});

customerGeneralSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    if (ret.cg_enrollment_date && ret.cg_dob) {
      ret.cg_enrollment_date = format(ret.cg_enrollment_date, "dd-MM-yyyy");
      ret.cg_dob = format(ret.cg_dob, "dd-MM-yyyy");
      return ret;
    }
  },
});

customerGeneralSchema.virtual("enrollment_date").get(function () {
  return this.cg_enrollment_date
    ? format(this.cg_enrollment_date, "yyyy-MM-dd")
    : null;
});
customerGeneralSchema.virtual("dob").get(function () {
  return this.cg_dob
    ? format(this.cg_dob, "yyyy-MM-dd")
    : null;
});

customerGeneralSchema.set("toJSON", {
  virtuals: true,
});

customerGeneralSchema.plugin(softDeletePlugin);
module.exports = mongoose.model(
  "altec_customer_general",
  customerGeneralSchema
);
