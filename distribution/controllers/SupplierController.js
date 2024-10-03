const supplierModel = require("../models/altec_supplier");
const gstSupplierModel = require("../models/altec_gst_supplier");
const { Response } = require("http-status-codez");
const catchAsyncError = require("../middlewares/catchAsyncError");
const apiHandler = require("../handler/api-handler");

//create supplier
exports.createSupplier = catchAsyncError(async (req, res) => {
  const sequentialNumber = await supplierModel.countDocuments();
  const supplierData = new supplierModel({
    auto_id: `S${(sequentialNumber + 1).toString().padStart(9, "0")}`,
    created_by: req.user.id,
    modified_by: req.user.id,
    ...req.body,
  });
  await supplierData.save();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: supplierData,
  });
});

// Get all supplier with company name, gst state masters, and  town details by using api handler
exports.getAllSupplier = catchAsyncError(async (req, res) => {
  const supplierData = await supplierModel.find();
  let suppliers = [];
  for (const supplier of supplierData) {
    const [companyData, townData, gstStateMastersData] = await Promise.all([
      apiHandler.getCompanyInfo(supplier.company),
      apiHandler.getTownInfo(supplier.town_code),
      apiHandler.getGstStateMastersInfo(supplier.gst_state_name),
    ]);
    const supplierObj = {
      supplier: supplier,
      company: companyData.data.data[0],
      town: townData.data.data,
      gst_state_name: gstStateMastersData.data.data,
    };
    suppliers.push(supplierObj);
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data fetched successfully",
    data: suppliers[0] ? suppliers[0] : [],
  });
});

// Fetch by Id
exports.getSupplierById = catchAsyncError(async (req, res) => {
  const supplierData = await supplierModel.findById(req.params.id);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data fetched successfully",
    data: supplierData,
  });
});

// Update supplier
exports.updateSupplier = catchAsyncError(async (req, res) => {
  const supplierData = await supplierModel.findByIdAndUpdate(
    req.params.id,
    {
      modified_by: req.user.id,
      ...req.body,
    },
    { new: true }
  );
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data updated successfully",
    data: supplierData,
  });
});

// Soft delete supplier
exports.deleteSupplier = catchAsyncError(async (req, res) => {
  const supplierData = await supplierModel.softDelete({ _id: req.params.id });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data deleted successfully",
    data: [],
  });
});

// Get supplier name and ID
exports.getSupplierNameAndId = catchAsyncError(async (req, res) => {
  const supplierData = await supplierModel
    .find()
    .select("supplier_name auto_id");
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data fetched successfully",
    data: supplierData,
  });
});
