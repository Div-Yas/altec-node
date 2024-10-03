const mongoose = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const channelDetailSchema = new mongoose.Schema({
  cmp_code: {
    type: String,
    required: [true, "Please enter a CMP code"],
  },
  channel_code: {
    type: String,
    required: [true, "Please enter a channel code"],
  },
  channel_name: {
    type: String,
    required: [true, "Please enter a channel name"],
  },
  sub_channel_code: {
    type: String,
    required: [true, "Please enter a sub channel code"],
  },
  sub_channel_name: {
    type: String,
    required: [true, "Please enter a sub channel name"],
  },
  group_code: {
    type: String,
    required: [true, "Please enter a group code"],
  },
  group_name: {
    type: String,
    required: [true, "Please enter a group name"],
  },
  class_code: {
    type: String,
    required: [true, "Please enter a class code"],
  },
  class_name: {
    type: String,
    required: [true, "Please enter a class name"],
  },
});

channelDetailSchema.plugin(softDeletePlugin);
module.exports = mongoose.model("altec_channel_detail", channelDetailSchema);
