const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const outletImage = new mongoose.Schema({
  cg_id: {
    type: String,
  },
  image_name: {
    type: String,
  },
});

outletImage.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_outlet_image", outletImage);
