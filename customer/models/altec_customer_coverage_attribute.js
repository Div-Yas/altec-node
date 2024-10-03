const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const customerCoverageAttribute = new mongoose.Schema({
  cg_id: {
    type: String,
  },
  ca_coverage_mode: {
    type: String,
  },
  ca_coverage_frequency: {
    type: String,
  },
  ca_sales_route: {
    type: String,
  },
  ca_delivery_route: {
    type: String,
  },
  ca_channel: {
    type: String,
  },
  ca_subchannel: {
    type: String,
  },
  ca_group: {
    type: String,
  },
  ca_class: {
    type: String,
  },
  ca_parent_child: {
    type: String,
  },
  ca_attach_parent: {
    type: String,
  },
  ca_key_account: {
    type: String,
  },
  ca_ra_mapping: {
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

customerCoverageAttribute.plugin(softDeletePlugin);
module.exports = mongoose.model(
  "altec_customer_coverage_attribute",
  customerCoverageAttribute
);
