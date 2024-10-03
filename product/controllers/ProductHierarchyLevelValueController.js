const producthierarchylevelvalueModel = require("../models/altec_product_hierarchy_level_value");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { Response } = require("http-status-codez");
const Validator = require("validatorjs");
const XLSX = require("xlsx");

//destroy ProductHierarchyLevelValue
exports.ProductHierarchyLevelValueDelete = catchAsyncError(async (req, res) => {
  await producthierarchylevelvalueModel.softDelete({ _id: req.params.id });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Deleted successfully",
    data: [],
  });
});

// producthierarchylevelvalue  Update
exports.ProductHierarchyLevelValueUpdate = catchAsyncError(async (req, res) => {
  const data = await producthierarchylevelvalueModel.findByIdAndUpdate(
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

//fetch producthierarchylevelvalue by id
exports.fetchProductHierarchyLevelValueById = catchAsyncError(
  async (req, res) => {
    const productvalue = await producthierarchylevelvalueModel.findById(
      req.params.id
    );
    res.status(Response.HTTP_OK).send({
      status: true,
      message: "Data Fetched successfully",
      data: productvalue,
    });
  }
);

//create producthierarchylevelvalue
exports.createProductHierarchyLevelValue = catchAsyncError(async (req, res) => {
  const productvalue = await producthierarchylevelvalueModel.create(req.body);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: [],
  });
});

//fetch ProductHierarchyLevelValue
exports.fetchProductHierarchyLevelValue = catchAsyncError(async (req, res) => {
  const producthierarchylevel = await producthierarchylevelvalueModel.find();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "fetched data successfully",
    data: producthierarchylevel,
  });
});

//ProductHierarchyLevelValue upload
exports.productHierarchyLevelValueUpload = catchAsyncError(async (req, res) => {
  const validationRule = new Validator(req, { file: "required" });
  if (validationRule.fails()) {
    return res.status(Response.HTTP_UNPROCESSABLE_ENTITY).send({
      status: false,
      message: "Validation failed",
      data: validationRule.errors.errors,
    });
  }
  let path = __basedir + "/assets/uploads/" + req.file.filename;
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
  const productHierarchyLevelValue = data.map((row) => ({
    company_code: row["Company Code"],
    level_name: row["Level Name"],
    level_value_code: row["Level Value Code"],
    level_value_name: row["Level Value Name"],
    reporting_level_name: row["Reporting Level Name"],
  }));
  await producthierarchylevelvalueModel.create(productHierarchyLevelValue);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "File uploaded successfully",
    data: [],
  });
});

// Product Hierarchy Level Value Sample File
exports.sampleExcelDownload = catchAsyncError(async (req, res) => {
  let data = [
    {
      "Company Code": "ALTEC",
      "Level Name": "Level 1",
      "Level Value Code": "L1",
      "Level Value Name": "Level 1",
      "Reporting Level Name": "Level 1",
    },
  ];
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Product Hierarchy Level Value"
  );
  const outputFileName = "Product Hierarchy Level Value.xlsx";
  XLSX.writeFile(workbook, outputFileName);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Sample Excel file generated",
    data: [],
  });
});
