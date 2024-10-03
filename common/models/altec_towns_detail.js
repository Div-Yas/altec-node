const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const townsDetailSchema = new mongoose.Schema({
  country_code: {
    type: String,
    required: [true, "Please enter a country code"],
  },
  country_name: {
    type: String,
    required: [true, "Please enter a country name"],
  },
  postal_code: {
    type: String,
    required: [true, "Please enter a postal code"],
  },
  state_code: {
    type: String,
    required: [true, "Please enter a state code"],
  },
  district_code: {
    type: String,
    required: [true, "Please enter a district code"],
  },
  town_code: {
    type: String,
    required: [true, "Please enter a town code"],
  },
  town_name: {
    type: String,
    required: [true, "Please enter a town name"],
  },
  district_name: {
    type: String,
    required: [true, "Please enter a district name"],
  },
  state_name: {
    type: String,
    required: [true, "Please enter a state name"],
  },
  population: {
    type: String,
    required: [true, "Please enter a population"],
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
townsDetailSchema.plugin(softDeletePlugin);

module.exports = mongoose.model("altec_town_details", townsDetailSchema);
