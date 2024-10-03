const productPricingModel = require("../models/altec_product_pricing");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { Response } = require("http-status-codez");
const Validator = require("validatorjs");
const XLSX = require("xlsx");

//Excel uploadfunction
exports.productPricingUpload = catchAsyncError(async (req, res, next) => {
  const validationRules = new Validator(req, { file: "required" });
  if (validationRules.fails()) {
    return res.status(Response.HTTP_UNPROCESSABLE_ENTITY).send({
      status: false,
      message: "Validation failed",
      data: validationRules.errors.errors,
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
      message: "The upload file is empty.",
      data: [],
    });
  }
  const productPricingData = data.map((row) => ({
    batch_code: row["Batch Code"],
    distributor: row["Distributor"],
    dist_type_from: row["Distributor Type From"],
    dist_type_to: row["Distributor Type To"],
    product_code: row["Product Code"],
    batch_creation_date: row["Batch Creation Date"],
    manufactured_date: row["Manufactured Date"],
    expiry_date: row["Expiry Date"],
    effective_from_date: row["Effective From Date"],
    purchase_rate: row["Purchase Rate"],
    selling_rate: row["Selling Rate"],
    mrp: row["MRP"],
    created_by: req.user.userid,
    modified_by: req.user.userid,
  }));
  await productPricingModel.create(productPricingData);
  res.status(Response.HTTP_ACCEPTED).send({
    status: true,
    message: "File uploaded successfully",
    data: [],
  });
});

//sample excel download format
exports.sampleExcelDownload = catchAsyncError(async (req, res, next) => {
  let data = [
    {
      "Batch Code": "",
      "Distributor": "",
      "Distributor Type From": "",
      "Distributor Type To": "",
      "Product Code": "",
      "Batch Creation Date": "",
      "Manufactured Date": "",
      "Expiry Date": "",
      "Effective From Date": "",
      "Purchase Rate": "",
      "Selling Rate": "",
      "MRP": "",
    },
  ];
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Product Pricing");
  const outputFileName = "Product Pricing.xlsx";
  XLSX.writeFile(workbook, outputFileName);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Sample Excel File Generated",
    data: [],
  });
});
