const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const { format } = require("date-fns");

const salesmanSchema = new mongoose.Schema({
  distributor_code: {
    type: String,
    required: [true, "Please enter a distributor code"],
  },
  distributor_branch_code: {
    type: String,
  },
  salesman_name: {
    type: String,
    required: [true, "Please enter a salesman name"],
  },
  email_id: {
    type: String,
    required: [true, "Please enter a Email id"],
  },
  phone_no: {
    type: String,
    required: [true, "Please enter a Phone no"],
  },
  daily_allowance: {
    type: String,
    required: [true, "Please enter a daily allowance"],
  },
  salary: {
    type: String,
    required: [true, "Please enter a salary"],
  },
  is_active: {
    type: String,
    required: [true, "Please enter a is active state"],
  },
  date_of_birth: {
    type: Date,
    required: [true, "Please enter a date of birth"],
  },
  date_of_joining: {
    type: Date,
    required: [true, "Please enter a date of joining"],
  },
  password: {
    type: String,
  },
  salesman_type: {
    type: String,
    required: [true, "Please enter a salesman type"],
  },
  smuniqcode: {
    type: String,
    required: [true, "Please enter a smuniqcode"],
  },
  thirdpartyemployeecode: {
    type: String,
    required: [true, "Please enter a thirdpartyemployeecode"],
  },
  replacementfor: {
    type: String,
    required: [true, "Please enter a replacementfor"],
  },
  default_status: {
    type: String,
  },
  attach_company: {
    type: String,
  },
  sales_type: {
    type: String,
  },
  aadhaar_no: {
    type: String,
  },
  sfa_status: {
    type: String,
  },
  device_no: {
    type: String,
  },
  sfa_pass_status: {
    type: String,
  },
  salesman_image: {
    type: String,
  },
  salesman_code: {
    type: String,
    unique: true,
  },
  godown_status: {
    type: String,
  },
  status: {
    type: Boolean,
    default: "1",
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
salesmanSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    if (ret.date_of_joining && ret.date_of_birth) {
      ret.date_of_joining = format(ret.date_of_joining, "dd-MM-yyyy");
      ret.date_of_birth = format(ret.date_of_birth, "dd-MM-yyyy");
      return ret;
    }
  },
});
salesmanSchema.virtual("doj").get(function () {
  return this.date_of_joining
    ? format(this.date_of_joining, "yyyy-MM-dd")
    : null;
});

salesmanSchema.virtual("dob").get(function () {
  return this.date_of_birth ? format(this.date_of_birth, "yyyy-MM-dd") : null;
});
salesmanSchema.set("toJSON", {
  virtuals: true,
});

salesmanSchema.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_salesman_info", salesmanSchema);
