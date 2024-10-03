const geographyHierarchyModel = require("../models/altec_geography_hierarchy_level");
const catchAsyncError = require("../middlewares/catchAsyncError");
const apiHandler = require("../handler/api-handler");
const { Response } = require("http-status-codez");
const Validator = require("validatorjs");
const XLSX = require("xlsx");

// Goegraphy hierarchy level upload
exports.geographyHierarchyUpload = catchAsyncError(async (req, res) => {
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
  const geographyHierarchy = data.map((row) => ({
    company_code: row["Company Code"],
    level_code: row["Level Code"],
    level_name: row["Level Name"],
  }));
  await geographyHierarchyModel.create(geographyHierarchy);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "File uploaded successfully",
    data: [],
  });
});

// Goegraphy hierarchy level Fetch
exports.geographyHierarchyFetch = catchAsyncError(async (req, res) => {
  const geographyHierarchy = await geographyHierarchyModel.find();
  const geographyCompany = [];
  for (const row of geographyHierarchy) {
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
      geographyCompany.push(data);
    }
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: geographyCompany,
  });
});

// Geography hierarchy level  Insert
exports.geographyHierarchyInsert = catchAsyncError(async (req, res) => {
  const data = await geographyHierarchyModel.create(req.body);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: data,
  });
});

// Geography hierarchy level Get by ID
exports.geographyHierarchyFetchById = catchAsyncError(async (req, res) => {
  const data = await geographyHierarchyModel.findById(req.params.id);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: data,
  });
});

// Geography hierarchy level  Update
exports.geographyHierarchyUpdate = catchAsyncError(async (req, res) => {
  const data = await geographyHierarchyModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Updated successfully",
    data: data,
  });
});

// Geography hierarchy level Delete
exports.geographyHierarchyDelete = catchAsyncError(async (req, res) => {
  await geographyHierarchyModel.softDelete({ _id: req.params.id });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Deleted successfully",
    data: [],
  });
});
