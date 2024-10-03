const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const companySchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: [true, "Please enter a company name"],
  },
  company_phone: {
    type: String,
  },
  company_email: {
    type: String,
  },
  company_code: {
    type: String,
    required: [true, "Please enter a company code"],
    unique: true,
  },
  company_address: {
    type: String,
    required: [true, "Please enter a company address"],
  },
  company_address1: {
    type: String,
    required: [true, "Please enter a company address1"],
  },
  company_address2: {
    type: String,
    required: [true, "Please enter a company address2"],
  },
  company_postal_code: {
    type: String,
  },
  company_country: {
    type: String,
    required: [true, "Please enter a company country"],
  },
  company_state: {
    type: String,
    required: [true, "Please enter a company state"],
  },
  company_district: {
    type: String,
    required: [true, "Please enter a company district"],
  },
  company_city: {
    type: String,
    required: [true, "Please enter a company city"],
  },
  business_vertical: {
    type: String,
    required: [true, "Please enter a business vertical"],
  },
  multiple: {
    type: String,
    default: null,
  },
  default_status: {
    type: String,
  },
  status: {
    type: Boolean,
    default: 1,
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

companySchema.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_companies", companySchema);
