const routeModel = require("../models/altec_route");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { Response } = require("http-status-codez");
const Validator = require("validatorjs");
const XLSX = require("xlsx");
const constants = require("../config/constants");

//Routes upload
exports.routeUpload = catchAsyncError(async (req, res) => {
  const validationRule = new Validator(req, { file: "required" });
  if (validationRule.fails()) {
    return res.status(Response.HTTP_UNPROCESSABLE_ENTITY).send({
      status: false,
      message: "Validation failed",
      data: validationRule.errors.errors,
    });
  }
  let path = __basedir + "/assets/uploads/MasterExcel/" + req.file.filename;
  const workbook = XLSX.readFile(path);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(worksheet, {
    raw: false,
  });
  if (data.length === 0) {
    return res.status(Response.HTTP_UNPROCESSABLE_ENTITY).send({
      status: false,
      message: "The uploaded file is empty.",
      data: [],
    });
  }
  const route = data.map((row) => ({
    route_code: row["Route Code"],
    distributor_code: row["Distributor Code"],
    distributor_branch_code: row["Distributor Branch Code"],
    route_name: row["Route Name"],
    is_active: row["Is Active"],
    is_van_route: row["Is Van Route"],
    population: row["Population"],
    distance: row["Distance"],
    route_type: row["Route Type"],
    city: row["City"],
    local_upcountry: row["Local/Upcountry"],
  }));
  await routeModel.create(route);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "File uploaded successfully",
    data: [],
  });
});

// Create Route
exports.createRoute = catchAsyncError(async (req, res) => {
  let route = new routeModel();
  route.distributor_code = req.body.distributor_branch_code;
  route = Object.assign(route, req.body);
  await route.save();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: route,
  });
});

// Get Route List
exports.getRouteList = catchAsyncError(async (req, res) => {
  const routeList = await routeModel.find();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: routeList,
  });
});

// Get Single Route
exports.getSingleRoute = catchAsyncError(async (req, res) => {
  const route = await routeModel.findById(req.params.id);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: route,
  });
});

// Update Route
exports.updateRoute = catchAsyncError(async (req, res) => {
  const route = await routeModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Updated successfully",
    data: route,
  });
});

// Delete Route
exports.deleteRoute = catchAsyncError(async (req, res) => {
  await routeModel.softDelete({ _id: req.params.id });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Deleted successfully",
    data: [],
  });
});

// fetch Route
exports.fetchRoute = catchAsyncError(async (req, res) => {
  const route = await routeModel.find({
    route_code: req.params.route_code,
  });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: route,
  });
});

// Fetch Routes List by route type
exports.listRoute = catchAsyncError(async (req, res) => {
  const filter = {
    route_type: req.params.route_type,
  };
  let routeData = await routeModel.find(filter, {
    route_code: 1,
    route_name: 1,
  });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: routeData,
  });
});

//Fetch Route List By Distributor Code
exports.fetchRouteList = catchAsyncError(async (req, res) => {
  const routeList = await routeModel.find({
    distributor_code: req.params.distributor_code,
  });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: routeList,
  });
});

//fetch Route List By Distributor Code
exports.fetchRouteListAdmin = catchAsyncError(async (req, res) => {
  let filter = {};
  if (req.user.role == constants.ROLE_DISTRIBUTOR) {
    filter.distributor_code = req.body.distributor_code;
  }
  const routeList = await routeModel.find(filter);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: routeList,
  });
});
