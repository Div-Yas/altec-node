const customerGeneral = require("../models/altec_customer_general");
const customerLicenceSetting = require("../models/altec_customer_licence_setting");
const customerCoverageAttribute = require("../models/altec_customer_coverage_attribute");
const customerRouteModel = require("../models/altec_customer_route");
const outletImage = require("../models/altec_outlet_image");
const catchAsyncError = require("../middlewares/catchAsyncError");
const axios = require("axios");
const apiHandler = require("../handler/api-handler");
const { Response } = require("http-status-codez");
const Validator = require("validatorjs");
const XLSX = require("xlsx");

// Create Customer
exports.createCustomer = catchAsyncError(async (req, res) => {
  // Customer General
  let customerGeneralData = new customerGeneral();
  customerGeneralData.modified_by = req.user.userid;
  customerGeneralData.created_by = req.user.userid;
  customerGeneralData = Object.assign(customerGeneralData, req.body);
  await customerGeneralData.save();
  // Customer Licence Setting
  let customerLicenceSettingData = new customerLicenceSetting();
  customerLicenceSettingData.cg_id = customerGeneralData._id;
  customerLicenceSettingData.modified_by = req.user.userid;
  customerLicenceSettingData.created_by = req.user.userid;
  customerLicenceSettingData = Object.assign(
    customerLicenceSettingData,
    req.body
  );
  await customerLicenceSettingData.save();
  // Customer Coverage Attribute
  let customerCoverageAttributeData = new customerCoverageAttribute();
  customerCoverageAttributeData.cg_id = customerGeneralData._id;
  customerCoverageAttributeData.modified_by = req.user.userid;
  customerCoverageAttributeData.created_by = req.user.userid;
  var image = req.files.ca_attach_parent[0].path;
  var ca_filename = image.split("outlets\\")[1];
  customerCoverageAttributeData.ca_attach_parent = ca_filename;
  customerCoverageAttributeData = Object.assign(
    customerCoverageAttributeData,
    req.body
  );
  await customerCoverageAttributeData.save();
  // Customer Outlet Image upload
  var outlets = req.files.image_name;
  outlets.forEach(async (file) => {
    let outletImageData = new outletImage();
    outletImageData.cg_id = customerGeneralData._id;
    outletImageData.modified_by = req.user.userid;
    outletImageData.created_by = req.user.userid;
    var image = file.path;
    var outlet_filename = image.split("outlets\\")[1];
    outletImageData.image_name = outlet_filename;
    await outletImageData.save();
  });

  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: customerGeneralData,
  });
});

// Fetch Customer based on Approval Status
exports.fetchCustomer = catchAsyncError(async (req, res) => {
  const data = await customerGeneral.find({
    ca_approval_status: req.body.ca_approval_status,
  });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: data,
  });
});

// Soft-delete Customer
exports.deleteCustomer = catchAsyncError(async (req, res) => {
  await customerGeneral.softDelete({ _id: req.params.id });
  await customerLicenceSetting.softDelete({ cg_id: req.params.id });
  await customerCoverageAttribute.softDelete({ cg_id: req.params.id });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Deleted successfully",
    data: [],
  });
});

//Customer Status Update
exports.updateCustomerStatus = catchAsyncError(async (req, res) => {
  const data = await customerGeneral.updateMany(
    { _id: { $in: req.body.id } },
    {
      $set: {
        ca_approval_status: req.body.ca_approval_status,
        ca_customer_status: req.body.ca_customer_status,
      },
    }
  );
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: data,
  });
});

//Fetch customer by id
exports.fetchCustomerById = catchAsyncError(async (req, res) => {
  const cgData = await customerGeneral.findById(req.params.id);
  const caData = await customerCoverageAttribute.findOne({ cg_id: cgData._id });
  const lsData = await customerLicenceSetting.findOne({ cg_id: cgData._id });
  const outletData = await outletImage.find({ cg_id: cgData._id });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: {
      cg_data: cgData,
      ca_data: caData,
      ls_data: lsData,
      outlet_data: outletData,
    },
  });
});

// customer route upload
exports.customerRouteUpload = catchAsyncError(async (req, res) => {
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
  const customerRoute = data.map((row) => ({
    distributor_code: row["Distributor Code"],
    distributor_branch_code: row["Distributor Branch Code"],
    customer_code: row["Customer Code"],
    route_code: row["Route Code"],
    route_type: row["Route Type"],
  }));
  await customerRouteModel.create(customerRoute);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "File uploaded successfully",
    data: [],
  });
});

// customer route fetch
exports.customerRouteFetch = catchAsyncError(async (req, res) => {
  const data = await customerRouteModel.find();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: data,
  });
});

// Upload Customer pending
exports.customerUpload = catchAsyncError(async (req, res) => {});

// Fetch Customer generals
exports.customerGeneralsFetch = catchAsyncError(async (req, res) => {
  const filter = {
    cg_customer_code: req.params.customer_code,
  };
  const customer = await customerGeneral.find(filter);
  return res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: customer,
  });
});

// Fetch Customer Coverage
exports.customerCoverageFetch = catchAsyncError(async (req, res) => {
  const data = JSON.parse(req.params.filter);
  const customer = await customerCoverageAttribute.find(data);
  return res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: customer,
  });
});

// Fetch Sales or delivery Route List
exports.routeList = catchAsyncError(async (req, res) => {
  let route_type = req.body.route_type;
  const serviceRoute = await axios.all([apiHandler.getRouteList(route_type)]);
  let routeListData = {};
  if (serviceRoute !== null) {
    routeListData = serviceRoute[0].data.data;
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: routeListData,
  });
});

// Fetch Channel List
exports.channelList = catchAsyncError(async (req, res) => {
  const serviceChannel = await axios.all([apiHandler.getChannelList()]);
  let channelListData = {};
  if (serviceChannel !== null) {
    channelListData = serviceChannel[0].data.data;
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: channelListData,
  });
});

// Fetch Sub Channel List by Channel Code
exports.subchannelList = catchAsyncError(async (req, res) => {
  let channel_code = req.params.channel_code;
  const serviceSubchannel = await axios.all([
    apiHandler.getSubchannelList(channel_code),
  ]);
  let subchannelListData = {};
  if (serviceSubchannel !== null) {
    subchannelListData = serviceSubchannel[0].data.data;
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: subchannelListData,
  });
});

// Fetch Group List by Subchannel Code
exports.groupList = catchAsyncError(async (req, res) => {
  let subchannel_code = req.params.subchannel_code;
  const serviceGroup = await axios.all([
    apiHandler.getGroupList(subchannel_code),
  ]);
  let groupListData = {};
  if (serviceGroup !== null) {
    groupListData = serviceGroup[0].data.data;
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: groupListData,
  });
});

// Fetch Class List by Group Code
exports.classList = catchAsyncError(async (req, res) => {
  let group_code = req.params.group_code;
  const serviceClass = await axios.all([apiHandler.getClassList(group_code)]);
  let classListData = {};
  if (serviceClass !== null) {
    classListData = serviceClass[0].data.data;
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: classListData,
  });
});
