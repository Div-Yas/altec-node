const channelDetail = require("../models/altec_channel_detail");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { Response } = require("http-status-codez");

// Get Channel List all
exports.getChannelList = catchAsyncError(async (req, res) => {
  const channelList = await channelDetail.aggregate([
    {
      $group: {
        _id: {
          channel_code: "$channel_code",
          channel_name: "$channel_name",
          sub_channel_code: "$sub_channel_code",
          sub_channel_name: "$sub_channel_name",
        },
        channel_code: { $first: "$channel_code" },
        channel_name: { $first: "$channel_name" },
        sub_channel_code: { $first: "$sub_channel_code" },
        sub_channel_name: { $first: "$sub_channel_name" },
      },
    },
  ]);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: channelList,
  });
});

// Get Group list all
exports.getGroupList = catchAsyncError(async (req, res) => {
  const groupList = await channelDetail.aggregate([
    {
      $group: {
        _id: {
          group_code: "$group_code",
          group_name: "$group_name",
          channel_name: "$channel_name",
        },
        group_code: { $first: "$group_code" },
        group_name: { $first: "$group_name" },
        channel_name: { $first: "$channel_name" },
      },
    },
  ]);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: groupList,
  });
});

// Get Class list all
exports.getClassList = catchAsyncError(async (req, res) => {
  const classList = await channelDetail.aggregate([
    {
      $group: {
        _id: {
          class_code: "$class_code",
          class_name: "$class_name",
          group_name: "$group_name",
        },
        class_code: { $first: "$class_code" },
        class_name: { $first: "$class_name" },
        group_name: { $first: "$group_name" },
      },
    },
  ]);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: classList,
  });
});

// Get Channel List Group by Channel Code
exports.channelList = catchAsyncError(async (req, res) => {
  const channelList = await channelDetail.aggregate([
    {
      $group: {
        _id: {
          channel_code: "$channel_code",
        },
        channel_code: { $first: "$channel_code" },
        channel_name: { $first: "$channel_name" },
      },
    },
  ]);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: channelList,
  });
});

// Get Subchannel List based Channel Code and group by Subchannel Code
exports.subchannelList = catchAsyncError(async (req, res) => {
  const subchannelList = await channelDetail.aggregate([
    {
      $match: {
        channel_code: req.params.channel_code,
        sub_channel_code: { $ne: "" },
      },
    },
    {
      $group: {
        _id: {
          sub_channel_code: "$sub_channel_code",
        },
        sub_channel_code: { $first: "$sub_channel_code" },
        sub_channel_name: { $first: "$sub_channel_name" },
      },
    },
  ]);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: subchannelList,
  });
});

// Get Group List based Subchannel Code and group by Group Code
exports.groupList = catchAsyncError(async (req, res) => {
  const groupList = await channelDetail.aggregate([
    {
      $match: {
        sub_channel_code: req.params.subchannel_code,
        group_code: { $ne: "" },
      },
    },
    {
      $group: {
        _id: {
          group_code: "$group_code",
        },
        group_code: { $first: "$group_code" },
        group_name: { $first: "$group_name" },
      },
    },
  ]);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: groupList,
  });
});

// Get Class List based Subchannel Code and group by Class Code
exports.classList = catchAsyncError(async (req, res) => {
  const classList = await channelDetail.aggregate([
    {
      $match: {
        group_code: req.params.group_code,
        class_code: { $ne: "" },
      },
    },
    {
      $group: {
        _id: {
          class_code: "$class_code",
        },
        class_code: { $first: "$class_code" },
        class_name: { $first: "$class_name" },
      },
    },
  ]);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: classList,
  });
});
