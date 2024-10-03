const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const { format } = require("date-fns");

const customerLicenceSetting = new mongoose.Schema({
  cg_id: {
    type: String,
  },
  ls_tin_no: {
    type: String,
  },
  ls_pin_no: {
    type: String,
  },
  ls_license_no: {
    type: String,
  },
  ls_cst_no: {
    type: String,
  },
  ls_drug_license_no1: {
    type: String,
  },
  ls_lic_expiry_date: {
    type: Date,
  },
  ls_drug_license_no2: {
    type: String,
  },
  ls_dl1_expiry_date: {
    type: Date,
  },
  ls_pest_license_no: {
    type: String,
  },
  ls_dl2_expiry_date: {
    type: Date,
  },
  ls_fssai_no: {
    type: String,
  },
  ls_credit_bill: {
    type: String,
  },
  ls_credit_bill_status: {
    type: String,
  },
  ls_credit_limit: {
    type: String,
  },
  ls_credit_limit_status: {
    type: String,
  },
  ls_credit_days: {
    type: String,
  },
  ls_credit_days_status: {
    type: String,
  },
  ls_cash_discount: {
    type: String,
  },
  ls_limit_amount: {
    type: String,
  },
  ls_cd_trigger_action: {
    type: String,
  },
  ls_trigger_amount: {
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

customerLicenceSetting.set("toJSON", {
  transform: function (doc, ret, opt) {
    if (
      ret.ls_lic_expiry_date &&
      ret.ls_dl1_expiry_date &&
      ret.ls_dl2_expiry_date
    ) {
      ret.ls_lic_expiry_date = format(ret.ls_lic_expiry_date, "dd-MM-yyyy");
      ret.ls_dl1_expiry_date = format(ret.ls_dl1_expiry_date, "dd-MM-yyyy");
      ret.ls_dl2_expiry_date = format(ret.ls_dl2_expiry_date, "dd-MM-yyyy");
      return ret;
    }
  },
});

customerLicenceSetting.virtual("lic_expiryDate").get(function () {
  return this.ls_lic_expiry_date
    ? format(this.ls_lic_expiry_date, "yyyy-MM-dd")
    : null;
});
customerLicenceSetting.virtual("dl1_expiryDate").get(function () {
  return this.ls_dl1_expiry_date
    ? format(this.ls_dl1_expiry_date, "yyyy-MM-dd")
    : null;
});
customerLicenceSetting.virtual("dl2_expiryDate").get(function () {
  return this.ls_dl2_expiry_date
    ? format(this.ls_dl2_expiry_date, "yyyy-MM-dd")
    : null;
});

customerLicenceSetting.set("toJSON", {
  virtuals: true,
});
customerLicenceSetting.plugin(softDeletePlugin);
module.exports = mongoose.model(
  "altec_customer_licence_setting",
  customerLicenceSetting
);
