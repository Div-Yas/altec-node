const SalesHiearchyModel = require("../models/altec_sales_hierarchy_level");
const catchAsyncError = require("../middlewares/catchAsyncError");
const apiHandler = require("../handler/api-handler");
const { Response } = require("http-status-codez");
const Validator = require("validatorjs");
const XLSX = require("xlsx");

// Sales hierarchy level upload
exports.uploadSalesHiearchyLevel = catchAsyncError(async (req, res) => {
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
  const SalesHiearchy = data.map((row) => ({
    company_code: row["Company Code"],
    level_code: row["Level Code"],
    level_name: row["Level Name"],
  }));
  await SalesHiearchyModel.create(SalesHiearchy);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "File uploaded successfully",
    data: [],
  });
});

// Sales Hiearchy level Fetch
exports.salesHiearchyFetch = catchAsyncError(async (req, res) => {
  const salesHierarchy = await SalesHiearchyModel.find();
  const salesCompany = [];

  for (const row of salesHierarchy) {
    const [serviceResponse] = await Promise.all([
      apiHandler.getCompanyInformation(row.company_code),
    ]);

    if (serviceResponse && serviceResponse.data && serviceResponse.data.data) {
      const companyData = serviceResponse.data.data;

      const data = {
        id: row._id,
        company_code: row.company_code,
        level_code: row.level_code,
        level_name: row.level_name,
        createdat: row.createdat,
        updatedat: row.updatedat,
        companyData: [],
      };

      if (typeof companyData === "object") {
        const values = Object.values(companyData);
        const found = values.includes(row.company_code);
        if (found) {
          data.companyData = companyData;
        }
      }

      salesCompany.push(data);
    }
  }

  res.status(Response.HTTP_OK).json({
    status: true,
    message: "Data Fetched successfully",
    data: salesCompany,
  });
});

// Sales Hiearchy level Insert
exports.salesHiearchyInsert = catchAsyncError(async (req, res) => {
  const data = await SalesHiearchyModel.create(req.body);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: data,
  });
});

// Sales Hiearchy level Update
exports.salesHiearchyUpdate = catchAsyncError(async (req, res) => {
  const updateData = await SalesHiearchyModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Updated successfully",
    data: updateData,
  });
});

// Sales Hiearchy Level Delete
exports.salesHiearchyLevelDelete = catchAsyncError(async (req, res) => {
  await SalesHiearchyModel.softDelete({ _id: req.params.id });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Deleted successfully",
    data: [],
  });
});

// Sales Hiearchy Level Get by ID
exports.salesHiearchyFetchById = catchAsyncError(async (req, res) => {
  const data = await SalesHiearchyModel.findById(req.params.id);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: data,
  });
});
