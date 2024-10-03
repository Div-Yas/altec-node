const salesmanJCRouteMappingModel = require("../models/altec_salesman_jc_route_mapping");
const salesmanModel = require("../models/altec_salesman_info");
const salesmanDistributorMappingModel = require("../models/altec_salesman_distributor_mapping");
const salesmanRouteModel = require("../models/altec_salesman_route_mapping");
const salesmanAttendanceModel = require("../models/altec_salesman_attendance");
const salesmanMarketVisitModel = require("../models/altec_salesman_marketvisit_attendance");
const catchAsyncError = require("../middlewares/catchAsyncError");
const apiHandler = require("../handler/api-handler");
const { Response } = require("http-status-codez");
const constants = require("../config/constants");
const Validator = require("validatorjs");
const XLSX = require("xlsx");
const axiosErrorHandler = require("../middlewares/axiosErrorHandler");
const { format } = require("date-fns");
const moment = require("moment-timezone");

// salesman upload
exports.salesmanUpload = catchAsyncError(async (req, res) => {
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

  const salesman = data.map((row) => ({
    distributor_code: row["Distributor Code"],
    distributor_branch_code: row["Distributor Branch Code"],
    salesman_name: row["Salesman Name"],
    email_id: row["Email Id"],
    phone_no: row["Phone No"],
    daily_allowance: row["Daily Allowance"],
    salary: row["Salary"],
    is_active: row["Is Active"] == "Active" ? 1 : 0,
    date_of_birth: moment
      .tz(row["Date of Birth"], "America/New_York")
      .tz("Asia/Kolkata"),
    date_of_joining: moment
      .tz(row["Date of Joining"], "America/New_York")
      .tz("Asia/Kolkata"),
    password: row["Password"],
    salesman_type: row["Salesman Type"],
    smuniqcode: row["SM Unique Code"],
    thirdpartyemployeecode: row["Third Party Employee Code"],
    replacementfor: row["Replacement For"],
    salesman_code: row["Salesman Code"],
  }));
  await salesmanModel.create(salesman);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "File uploaded successfully",
    data: [],
  });
});

// salesman distributor mapping upload
exports.salesmanDistributorMappingUpload = catchAsyncError(async (req, res) => {
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
  const salesmanDistributorMapping = data.map((row) => ({
    salesman_code: row["Salesman Code"],
    distributor_code: row["Distributor Code"],
  }));
  await salesmanDistributorMappingModel.create(salesmanDistributorMapping);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "File uploaded successfully",
    data: [],
  });
});

// Fetch Distributor Mapping
exports.salesmanDistributorMappingFetch = catchAsyncError(async (req, res) => {
  const data = await salesmanDistributorMappingModel.find();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: data,
  });
});

// Salesman JC route mapping upload
exports.salesmanJCRouteMappingUpload = catchAsyncError(async (req, res) => {
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
  const salesmanJCRouteMapping = data.map((row) => ({
    distributor_code: row["Distributor Code"],
    customer_code: row["Customer Code"],
    salesman_code: row["Salesman Code"],
    route_code: row["Route Code"],
    jc_month: row["JC Month"],
    frequency: row["Frequency"],
    daily: row["Daily"],
    weekly: row["Weekly"],
    monthly: row["Monthly"],
    status: row["Status"] == "Active" ? 1 : 0,
  }));
  await salesmanJCRouteMappingModel.create(salesmanJCRouteMapping);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "File uploaded successfully",
    data: [],
  });
});

// Salesman Route Mapping upload
exports.routeMappingUpload = catchAsyncError(async (req, res) => {
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
  const routeMapping = data.map((row) => ({
    distributor_code: row["Distributor Code"],
    distributor_branch_code: row["Distributor Branch Code"],
    salesman_code: row["Salesman Code"],
    route_code: row["Route Code"],
  }));
  await salesmanRouteModel.create(routeMapping);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "File uploaded successfully",
    data: [],
  });
});

// Salesman Route Mapping Fetch
exports.routeMappingFetch = catchAsyncError(async (req, res) => {
  const data = await salesmanRouteModel.find();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: data,
  });
});

// Salesman JC route mapping Fetch
exports.salesmanJCRouteMappingFetch = catchAsyncError(async (req, res) => {
  var query = {};
  if (req.user.role == constants.ROLE_ADMIN) {
    query.status = true;
  } else if (req.user.role == constants.ROLE_DISTRIBUTOR) {
    query.status = true;
    query.distributor_code = req.body.distributor_code;
  }
  let jcRouteMappingData = await salesmanJCRouteMappingModel.find(query);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: jcRouteMappingData,
  });
});

// Create Salesman
exports.createSalesman = catchAsyncError(async (req, res) => {
  if (req.file) {
    var image = req.file.path;
    var salesman_filename = image.split("salesman-img\\")[1];
  }
  if (req.body.sfa_pass_status == "Y") {
    var password = "12345678";
  } else {
    var password = "";
  }
  let salesman = new salesmanModel();
  salesman.password = password;
  salesman.salesman_image = salesman_filename;
  salesman = Object.assign(salesman, req.body);
  const details = {
    username: req.body.salesman_name,
    password: password,
    mobileno: req.body.phone_no,
    email: req.body.email_id,
    companyid: "12345",
    role: constants.ROLE_SALESMAN,
    salesman_code: req.body.salesman_code,
    distributor_code: null,
  };
  try {
    await axiosErrorHandler.post(
      `${constants.AUTH_BACKEND_URL}/api/auth/user/register`,
      details
    );
  } catch (error) {
    return res.status(error.status).send({
      status: true,
      message: error.data,
      data: [],
    });
  }
  await salesman.save();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: salesman,
  });
});

// Fetch Salesman
exports.fetchSalesman = catchAsyncError(async (req, res) => {
  let salesmanData = await salesmanModel.find();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: salesmanData,
  });
});

// Update Salesman
exports.updateSalesman = catchAsyncError(async (req, res) => {
  let updateData = {};

  if (req.file) {
    const image = req.file.path;
    const salesman_filename = image.split("salesman-img\\")[1];
    updateData.salesman_image = salesman_filename;
  }
  for (const key in req.body) {
    updateData[key] = req.body[key];
  }

  const salesmanData = await salesmanModel.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Updated successfully",
    data: salesmanData,
  });
});

// Delete Salesman
exports.deleteSalesman = catchAsyncError(async (req, res) => {
  await salesmanModel.softDelete({ _id: req.params.id });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Deleted successfully",
    data: [],
  });
});

//Fetch Salesman By Id
exports.fetchSalesmanById = catchAsyncError(async (req, res) => {
  let salesmanData = await salesmanModel.findById(req.params.id);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: salesmanData,
  });
});

//Joins fetch_salesman_route_map_list By Id
exports.fetchSalesmanRouteMapList = catchAsyncError(async (req, res) => {
  const salesmanRouteData = await salesmanRouteModel.find({
    distributor_code: req.body.distributor_code,
  });
  let SalesDetails = [];
  for (const row of salesmanRouteData) {
    const data = await fetchSalesmanAndRouteInfo(row);
    SalesDetails.push(data);
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: SalesDetails[0] ? SalesDetails : [],
  });
});

// Sub Function for Fetch Salesman And Route Info
async function fetchSalesmanAndRouteInfo(row) {
  const [salesmanInfoResponse, routeInfoResponse] = await Promise.all([
    apiHandler.getSalesmanInformationBySalescode(row.salesman_code),
    apiHandler.getRouteInformation(row.route_code),
  ]);
  const salesmanData = salesmanInfoResponse.data.data;
  const routeData = routeInfoResponse.data.data;
  const data = {
    orderInfo: row,
    salesmanRouteInfo: salesmanData.length > 0 ? salesmanData[0] : [],
    routeInfo: routeData.length > 0 ? routeData[0] : [],
  };
  return data;
}

//Fetch Salesman Attendance for report module
exports.salesmanGetAttendance = catchAsyncError(async (req, res) => {
  const currentDate = new Date();
  const today = format(currentDate, "Y-MM-dd");
  var query = {};
  if (req.body.from_date && req.body.to_date) {
    query = {
      date: { $gte: req.body.from_date, $lte: req.body.to_date },
    };
  } else if (req.body.from_date) {
    query = {
      date: { $gte: req.body.from_date },
    };
  } else if (req.body.to_date) {
    query = {
      date: { $lte: req.body.to_date },
    };
  } else {
    query = {
      date: { $eq: today },
    };
  }
  let data = await salesmanAttendanceModel.find(query);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: data,
  });
});

//Fetch Salesman MarketVisit Attendance
exports.getSalesmanMarketVisit = catchAsyncError(async (req, res) => {
  const data = await salesmanMarketVisitModel.find({
    sa_id: req.params.sa_id,
  });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: data,
  });
});

// create Route Mapping
exports.createRouteMapping = catchAsyncError(async (req, res) => {
  const route = await salesmanRouteModel.create(req.body);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: route,
  });
});

// fetch Route Mapping
exports.fetchRouteMapping = catchAsyncError(async (req, res) => {
  let filter = {};
  const data = JSON.parse(req.params.filter);
  if (data.role == constants.ROLE_DISTRIBUTOR) {
    filter = {
      distributor_code: data.distributor_code,
      salesman_code: data.salesman_code,
    };
  } else {
    filter = {
      salesman_code: data.salesman_code,
    };
  }
  const route = await salesmanRouteModel.find(filter);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: route,
  });
});

// Fetch Salesman info
exports.fetchSalesmanInfo = catchAsyncError(async (req, res) => {
  let filter = {};
  if (req.params.filter.role == constants.ROLE_DISTRIBUTOR) {
    filter = {
      distributor_code: req.params.filter.distributor_code,
    };
  } else {
    filter = {};
  }
  let salesmanData = await salesmanModel.find(filter);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: salesmanData,
  });
});

// Fetch Salesman info by saleman Code
exports.fetchSalesmanInfoBySalesCode = catchAsyncError(async (req, res) => {
  const filter = {
    salesman_code: req.params.salesman_code,
  };
  let salesmanData = await salesmanModel.find(filter);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: salesmanData,
  });
});
