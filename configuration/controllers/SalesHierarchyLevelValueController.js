const salesHierarchyValueModel = require("../models/altec_sales_hierarchy_level_value");
const catchAsyncError = require("../middlewares/catchAsyncError");
const apiHandler = require("../handler/api-handler");
const { Response } = require("http-status-codez");
const Validator = require("validatorjs");
const XLSX = require("xlsx");

//Sales hierarchy level value upload
exports.salesHierarchyValueUpload = catchAsyncError(async (req, res) => {
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
  const salesHierarchyValue = data.map((row) => ({
    company_code: row["Company Code"],
    level_code: row["Level Code"],
    level_name: row["Level Name"],
    company_value: row["Company Value"],
  }));
  await salesHierarchyValueModel.create(salesHierarchyValue);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "File uploaded successfully",
    data: [],
  });
});

//Sales Hierarchy Level Value Fetch
exports.salesHierarchyLevelValueFetch = catchAsyncError(async (req, res) => {
  const salesValue = await salesHierarchyValueModel.find();
  const salesValueCompany = [];

  for (const row of salesValue) {
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
        company_value: row.company_value,
        status: row.status,
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

      salesValueCompany.push(data);
    }
  }

  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: salesValueCompany,
  });
});

//Sales Hierarchy Level Value Insert
exports.salesHierarchyLevelValueInsert = catchAsyncError(async (req, res) => {
  const data = await salesHierarchyValueModel.create(req.body);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: data,
  });
});

// Sales Hierarchy Level Value Get By Id
exports.salesHierarchyLevelValueById = catchAsyncError(async (req, res) => {
  const data = await salesHierarchyValueModel.findById(req.params.id);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: data,
  });
});

// Sales Hierarchy Level Value Update
exports.salesHierarchyLevelValueUpdate = catchAsyncError(async (req, res) => {
  const data = await salesHierarchyValueModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Updated successfully",
    data: data,
  });
});

//Sales Hierarchy Level Value Delete
exports.salesHierarchyLevelValueDelete = catchAsyncError(async (req, res) => {
  await salesHierarchyValueModel.softDelete({ _id: req.params.id });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Deleted successfully",
    data: [],
  });
});
