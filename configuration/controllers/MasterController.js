const deliveryboyRouteModel = require("../models/altec_deliveryboy_route");
const openingBalanceModel = require("../models/altec_opening_balance");
const deliveryboyModel = require("../models/altec_deliveryboy");
const catchAsyncError = require("../middlewares/catchAsyncError");
const constants = require("../config/constants");
const { Response } = require("http-status-codez");
const Validator = require("validatorjs");
const XLSX = require("xlsx");

// deliveryboy route upload
exports.deliveryboyRouteUpload = catchAsyncError(async (req, res) => {
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
  const deliveryBoyRoute = data.map((row) => ({
    distributor_code: row["Distributor Code"],
    distributor_branch_code: row["Distributor Branch Code"],
    deliveryboy_code: row["DeliveryBoy Code"],
    route_code: row["Route code"],
  }));
  await deliveryboyRouteModel.create(deliveryBoyRoute);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "File uploaded successfully",
    data: [],
  });
});

// deliveryboy route fetch
exports.deliveryboyRouteFetch = catchAsyncError(async (req, res) => {
  const data = await deliveryboyRouteModel.find();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: data,
  });
});

// Opening Balance upload
exports.openingBalanceUpload = catchAsyncError(async (req, res) => {
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
  const openingBalance = data.map((row) => ({
    distributor_code: row["Distributor Code"],
    distributor_branch_code: row["Distributor Branch Code"],
    coa_code: row["Coa Code"],
    credit_amount: row["Credit Amount"],
    debit_amount: row["Debit Amount"],
    opening_balance_date: row["Opening Balance Date"],
  }));
  await openingBalanceModel.create(openingBalance);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "File uploaded successfully",
    data: [],
  });
});

// Opening Balance Fetch
exports.openingBalanceFetch = catchAsyncError(async (req, res) => {
  const data = await openingBalanceModel.find();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: data,
  });
});

// Deliveryboy upload
exports.deliveryboyUpload = catchAsyncError(async (req, res) => {
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
  const deliveryBoy = data.map((row) => ({
    distributor_code: row["Distributor Code"],
    distributor_branch_code: row["Distributor Branch Code"],
    deliveryboy_code: row["DelivBoy Code"],
    deliveryboy_name: row["Delivery Boy Name"],
    phone_no: row["Phone No"],
    email_id: row["Email Id"],
    daily_allowance: row["Daily Allowance"],
    salary: row["Salary"],
    status: row["Is Active"] == "Active" ? 1 : 0,
    default_status: row["Is Default"],
  }));
  await deliveryboyModel.create(deliveryBoy);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "File uploaded successfully",
    data: [],
  });
});

// Deliveryboy Fetch
exports.deliveryboyFetch = catchAsyncError(async (req, res) => {
  const data = await deliveryboyModel.find();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: data,
  });
});

// Sample Excel Download
exports.sampleExcelDownload = catchAsyncError(async (req, res) => {
  let data = [];
  if (req.body.type == constants.DELIVERYBOY) {
    data = await deliveryboySampleData();
  } else if (req.body.type == constants.OPENING_BALANCE) {
    data = await openingBalanceSampleData();
  } else if (req.body.type == constants.DELIVERYBOY_ROUTE) {
    data = await deliveryboyRouteSampleData();
  } else if (req.body.type == constants.ROLE_SALESMAN) {
    data = await salesmanSampleData();
  } else if (req.body.type == constants.ROUTE) {
    data = await routeSampleData();
  } else if (req.body.type == constants.SALESMAN_ROUTE_MAPPING) {
    data = await salesmanRouteMappingSampleData();
  } else if (req.body.type == constants.SALESMAN_DISTRIBUTOR_MAPPING) {
    data = await salesmanDistributorMappingSampleData();
  } else if (req.body.type == constants.CUSTOMER) {
    data = await customerSampleData();
  } else if (req.body.type == constants.CUSTOMER_ROUTE) {
    data = await customerRouteSampleData();
  } else if (req.body.type == constants.GEOGRAPHY_HIERARCHY_LEVEL) {
    data = await geographyHierarchyLevelSampleData();
  } else if (req.body.type == constants.GEOGRAPHY_HIERARCHY_LEVEL_VALUE) {
    data = await geographyHierarchyLevelValueSampleData();
  } else if (req.body.type == constants.SALES_HIERARCHY_LEVEL) {
    data = await salesHierarchyLevelSampleData();
  } else if (req.body.type == constants.SALES_HIERARCHY_LEVEL_VALUE) {
    data = await salesHierarchyLevelValueSampleData();
  } else if (req.body.type == constants.TARGET) {
    data = await targetSampleData();
  }
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, `${req.body.type}`);
  const outputFileName = `${req.body.type}.xlsx`;
  XLSX.writeFile(workbook, outputFileName);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Sample Excel file generated",
    data: [],
  });
});

// Deliveryboy Sample data
async function deliveryboySampleData() {
  data = [
    {
      "Distributor Code": "GADS12312",
      "Distributor Branch Code": "20000",
      "DelivBoy Code": "123",
      "Delivery Boy Name": "Test",
      "Phone No": "1234567890",
      "Email Id": "test@gmail.com",
      "Daily Allowance": "4000",
      Salary: "20000",
      "Is Active": "Active",
      "Is Default": 1,
    },
  ];
  return data;
}

// Opening Balance Sample data
async function openingBalanceSampleData() {
  return [
    {
      "Distributor Code": "GADS12312",
      "Distributor Branch Code": "20000",
      "Coa Code": "123",
      "Credit Amount": "1000",
      "Debit Amount": "2000",
      "Opening Balance Date": "2021-01-01",
    },
  ];
}

// Deliveryboy Route Sample data
async function deliveryboyRouteSampleData() {
  return [
    {
      "Distributor Code": "GADS12312",
      "Distributor Branch Code": "20000",
      "Deliveryboy Code": "123",
      "Route Code": "123",
    },
  ];
}

// Salesman Sample data
async function salesmanSampleData() {
  return [
    {
      "Distributor Code": "GADS12335",
      "Distributor Branch Code": "APD1",
      "Salesman Name": "AAA",
      "Email Id": "test@gmail.com",
      "Phone No": "1234567890",
      "Daily Allowance": "20000",
      Salary: "200000",
      "Is Active": "Active",
      "Date of Birth": "2000-01-01",
      "Date of Joining": "2021-01-01",
      Password: "123456",
      Salesman: "New",
      "SM Unique Code": "SM12121210",
      "Third Party Employee Code": "TPE1010",
      "Replacement For": "No",
      "Salesman Code": "1",
    },
  ];
}

// Route Sample data
async function routeSampleData() {
  return [
    {
      "Route Code": "1",
      "Distributor Code": "GADS12312",
      "Distributor Branch Code": "20000",
      "Route Name": "Test",
      "Is Active": "Active",
      "Is Van Route": "Yes",
      Population: "1000",
      Distance: "1000",
      "Route Type": "Test",
      City: "Test",
      "Local/Upcountry": "Test",
    },
  ];
}

// Salesman Route Mapping Sample data
async function salesmanRouteMappingSampleData() {
  return [
    {
      "Distributor Code": "GADS12312",
      "Distributor Branch Code": "APD1",
      "Salesman Code": "23423445",
      "Route Code": "R01",
    },
  ];
}

// Salesman Distributor Mapping Sample data
async function salesmanDistributorMappingSampleData() {
  return [
    {
      "Salesman Code": "23423445",
      "Distributor Code": "GADS12312",
    },
  ];
}

// Customer Sample data
async function customerSampleData() {
  return [
    {
      "Channel Code/Sub Channel Code": "4001818972",
      "Group Code": "123",
      "Class Code": "Test",
      "Distributor Customer Code": "GT1000020075160002007516",
      "Customer Name": "Test",
      "Distributor Code": "GADS12312",
      "Distributor Branch Code": "GT100002010288000201",
      "Phone No": "1234567890",
      "Tax Type": "Retailer",
      "Retailer Type": "Registered",
      "Credit Bill": "342",
      "Credit Days": "5",
      "Credit Limit": "4000",
      "Cash Discount Percentage": "500",
      "Cash Discount Days": "5",
      "Cash Discount Limit": "10",
      "Cash Discount Trigger Amount": ">=",
      "Outstanding Bill": "Test",
      "Last Bill Date": "2023-08-09",
      "Balance OS": "Test",
      "Credit Bill Actual": "Test",
      "Credit Days Actual": "Test",
      "Credit Limit Actual": "Test",
      "Cash Discount Trigger Actual": "Test",
      "Date of Birth": "2000-08-09",
      "Date of Anniversary": "2023-08-09",
      "Drug License 1": "Test",
      "Drug License 1 Expiry Date": "2023-08-09",
      "Drug License 2": "Test",
      "Drug License 2 Expiry Date": "2023-08-09",
      "License No": "1",
      "License Expiry Date": "2023-08-09",
      "Pest License No": "2",
      "Pest License Expiry Date": "2023-08-09",
      "Postal Code": "608501",
      "TIN No": "123",
      "PIN No": "123",
      "Entroll Date": "2023-08-09",
      "Contact Person": "Test",
      "Eamil Id": "Test@gmail.com",
      "Store Type": "Test",
      "Main Store Type": "Test",
      "Coverage Mode": "Order Booking",
      "Coverage Frequency": "Weekly",
      City: "Cuuddalore",
      State: "Tamil Nadu",
      Country: "India",
      "Customer Address 1": "Test",
      "Customer Address 2": "Test",
      "Customer Address 3": "Test",
      Status: "Yes",
      "Mobile No": "1234567890",
    },
  ];
}

// Customer Route Sample data
async function customerRouteSampleData() {
  return [
    {
      "Distributor Code": "GADS12312",
      "Distributor Branch Code": "20000",
      "Customer Code": "123",
      "Route Code": "123",
      "Route Type": "Test",
    },
  ];
}

// Geography Hierarchy Level Sample data
async function geographyHierarchyLevelSampleData() {
  return [
    {
      "Company Code": "ALTEC",
      "Level Code": "1",
      "Level Name": "Company",
    },
  ];
}

// Geography Hierarchy Level Value Sample data
async function geographyHierarchyLevelValueSampleData() {
  return [
    {
      "Company Code": "ALTEC",
      "Level Code": "1",
      "Level Name": "Company",
      "Company Value": "ALTEC",
      "Reporting to": "ALTEC",
    },
  ];
}

// Sales Hierarchy Level Sample data
async function salesHierarchyLevelSampleData() {
  return [
    {
      "Company Code": "ALTEC",
      "Level Code": "1",
      "Level Name": "Company",
    },
  ];
}

// Sales Hierarchy Level Value Sample data
async function salesHierarchyLevelValueSampleData() {
  return [
    {
      "Company Code": "ALTEC",
      "Level Code": "1",
      "Level Name": "Company",
      "Company Value": "ALTEC",
    },
  ];
}

// Target Sample data
async function targetSampleData() {
  return [
    {
      "Employee Code": "ALTEC",
      "JC Period": "1",
      "Target Amount": "1000",
    },
  ];
}
