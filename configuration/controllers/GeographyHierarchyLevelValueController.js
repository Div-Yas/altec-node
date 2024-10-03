const geographyHierarchyValueModel = require("../models/altec_geography_hierarchy_level_value");
const catchAsyncError = require("../middlewares/catchAsyncError");
const apiHandler = require("../handler/api-handler");
const { Response } = require("http-status-codez");
const Validator = require("validatorjs");
const XLSX = require("xlsx");

// Goegraphy hierarchy level value upload
exports.geographyHierarchyValueUpload = catchAsyncError(async (req, res) => {
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
  const geographyHierarchyValue = data.map((row) => ({
    company_code: row["Company Code"],
    level_code: row["Level Code"],
    level_name: row["Level Name"],
    company_value: row["Company Value"],
    reporting_to: row["Reporting to"],
  }));
  await geographyHierarchyValueModel.create(geographyHierarchyValue);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "File uploaded successfully",
    data: [],
  });
});

// Goegraphy hierarchy level value Fetch
exports.geographyHierarchyValueFetch = catchAsyncError(async (req, res) => {
  const geographyHierarchyValue = await geographyHierarchyValueModel.find();
  const geographyValueCompany = [];
  for (const row of geographyHierarchyValue) {
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
        reporting_to: row.reporting_to,
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
      geographyValueCompany.push(data);
    }
  }
  res.status(Response.HTTP_OK).json({
    status: true,
    message: "Data Fetched successfully",
    data: geographyValueCompany,
  });
});

// Geography hierarchy level value Insert
exports.geographyHierarchyValueInsert = catchAsyncError(async (req, res) => {
  const data = await geographyHierarchyValueModel.create(req.body);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: data,
  });
});

// Geography hierarchy level value Get by ID
exports.geographyHierarchyValueFetchById = catchAsyncError(async (req, res) => {
  const fetchData = await geographyHierarchyValueModel.findById(req.params.id);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: fetchData,
  });
});

// Geography hierarchy level value Update
exports.geographyHierarchyValueUpdate = catchAsyncError(async (req, res) => {
  const updateData = await geographyHierarchyValueModel.findByIdAndUpdate(
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

// Geography hierarchy level value Delete
exports.geographyHierarchyValueDelete = catchAsyncError(async (req, res) => {
  await geographyHierarchyValueModel.softDelete({ _id: req.params.id });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Deleted successfully",
    data: [],
  });
});
