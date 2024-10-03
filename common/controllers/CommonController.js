const townsdetailModel = require("../models/altec_towns_detail");
const gstStateMastersModel = require("../models/altec_gst_state_masters");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { Response } = require("http-status-codez");

//fetch  Country
exports.fetchCountry = catchAsyncError(async (req, res, next) => {
  const countryData = await townsdetailModel.aggregate([
    {
      $group: {
        _id: {
          country_name: "$country_name",
        },
        country_name: { $first: "$country_name" },
        country_code: { $first: "$country_code" },
      },
    },
    {
      $project: {
        _id: 0,
        country_name: 1,
        country_code: 1,
      },
    },
  ]);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: countryData,
  });
});

//fetch state by country code
exports.fetchStateByCountryCode = catchAsyncError(async (req, res, next) => {
  const stateByCountry = await townsdetailModel.aggregate([
    {
      $match: {
        country_name: req.params.country_name,
      },
    },
    {
      $group: {
        _id: {
          state_name: "$state_name",
        },
        state_name: { $first: "$state_name" },
        state_code: { $first: "$state_code" },
        town_name: { $first: "$town_name" },
      },
    },
    {
      $project: {
        _id: 0,
        state_name: 1,
        state_code: 1,
        town_name: 1,
      },
    },
  ]);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: stateByCountry,
  });
});

//fetch district by state code
exports.fetchDistrictByStateCode = catchAsyncError(async (req, res, next) => {
  const districtByState = await townsdetailModel.aggregate([
    {
      $match: {
        state_name: req.params.state_name,
      },
    },
    {
      $group: {
        _id: {
          district_name: "$district_name",
        },
        district_name: { $first: "$district_name" },
        district_code: { $first: "$district_code" },
      },
    },
    {
      $project: {
        _id: 0,
        district_name: 1,
        district_code: 1,
      },
    },
  ]);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: districtByState,
  });
});

//fetch town by district code
exports.fetchTownByDistrictCode = catchAsyncError(async (req, res, next) => {
  const townByDistrict = await townsdetailModel.aggregate([
    {
      $match: {
        district_name: req.params.district_name,
      },
    },
    {
      $group: {
        _id: {
          town_name: "$town_name",
        },
        town_name: { $first: "$town_name" },
        town_code: { $first: "$town_code" },
      },
    },
    {
      $project: {
        _id: 0,
        town_name: 1,
        town_code: 1,
      },
    },
  ]);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: townByDistrict,
  });
});

//fetch postal code by city code
exports.fetchPostalCode = catchAsyncError(async (req, res, next) => {
  const postalCode = await townsdetailModel.aggregate([
    {
      $match: {
        district_name: req.params.district_name,
      },
    },
    {
      $group: {
        _id: {
          district_name: "$district_name",
        },
        postal_code: { $first: "$postal_code" },
      },
    },
    {
      $project: {
        _id: 0,
        postal_code: 1,
      },
    },
  ]);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: postalCode,
  });
});

//GET all city list
exports.getCityList = catchAsyncError(async (req, res) => {
  const cityList = await townsdetailModel.aggregate([
    {
      $group: {
        _id: {
          town_name: "$town_name",
        },
        town_name: { $first: "$town_name" },
        town_code: { $first: "$town_code" },
      },
    },
    {
      $project: {
        _id: 0,
        town_name: 1,
        town_code: 1,
      },
    },
  ]);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data fetched successfully",
    data: cityList,
  });
});

//fetch town by state code
exports.fetchTownByState = catchAsyncError(async (req, res, next) => {
  const townByState = await townsdetailModel.aggregate([
    {
      $match: {
        state_name: req.params.state_name,
      },
    },
    {
      $group: {
        _id: {
          town_name: "$town_name",
        },
        town_name: { $first: "$town_name" },
        town_code: { $first: "$town_code" },
      },
    },
    {
      $project: {
        _id: 0,
        town_name: 1,
        town_code: 1,
      },
    },
  ]);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: townByState,
  });
});

//fetch postal code by city code
exports.fetchPostalCodebyTown = catchAsyncError(async (req, res, next) => {
  const postalCode = await townsdetailModel.aggregate([
    {
      $match: {
        town_name: req.params.town_name,
      },
    },
    {
      $group: {
        _id: {
          postal_code: "$postal_code",
        },
        postal_code: { $first: "$postal_code" },
      },
    },
    {
      $project: {
        _id: 0,
        postal_code: 1,
      },
    },
  ]);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: postalCode,
  });
});

// Get GST State name using state code
exports.getGSTStateName = catchAsyncError(async (req, res, next) => {
  const gstStateName = await gstStateMastersModel
    .findOne({
      gst_state_code: req.params.gst_state_code,
    })
    .select("gst_state_name");
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data fetched successfully",
    data: gstStateName,
  });
});

// Get Town by town code
exports.getTownByTownCode = catchAsyncError(async (req, res, next) => {
  const townByTownCode = await townsdetailModel
    .findOne({
      town_code: req.params.town_code,
    })
    .select("country_name,state_name, district_name, town_name");
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data fetched successfully",
    data: townByTownCode,
  });
});

//gst state fetch list
exports.gstGstStateList = catchAsyncError(async (req, res, next) => {
  const gstStateName = await gstStateMastersModel.find({});
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data fetched successfully",
    data: gstStateName,
  });
});
