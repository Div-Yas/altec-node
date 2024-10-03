const uomModel = require("../models/altec_uom");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { Response } = require("http-status-codez");

//fetch Uom
exports.fetchUom = catchAsyncError(async (req, res) => {
  const uom = await uomModel.find();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: uom,
  });
});

//Create Uom
exports.createUom = catchAsyncError(async (req, res) => {
  const data = {
    uom_code: req.body.uom_code,
    uom_name: req.body.uom_name,
  };
  const uom_count = await uomModel.find(data).countDocuments();
  if (uom_count != 0) {
    return res.status(409).send({
      status: false,
      message: "Already is exist",
      data: [],
    });
  }
  const getData = await uomModel.create(data);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: getData,
  });
});

// Uom Delete
exports.uomDelete = catchAsyncError(async (req, res) => {
  await uomModel.softDelete({ _id: req.params.id });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Deleted successfully",
    data: [],
  });
});

// uom  Update
exports.uomUpdate = catchAsyncError(async (req, res) => {
  const data = await uomModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Updated successfully",
    data: data,
  });
});

//fetch Uom by id
exports.fetchUomById = catchAsyncError(async (req, res) => {
  const uom = await uomModel.findById(req.params.id);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: uom,
  });
});
