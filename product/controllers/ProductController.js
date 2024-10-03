const productModel = require("../models/altec_product");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { Response } = require("http-status-codez");

//fetch Product
exports.fetchProduct = catchAsyncError(async (req, res) => {
  const product = await productModel.find();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: product,
  });
});

//Create Product
exports.createProduct = catchAsyncError(async (req, res) => {
  const product = await productModel.create(req.body);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: product,
  });
});

// Product Delete
exports.productDelete = catchAsyncError(async (req, res) => {
  await productModel.softDelete({ _id: req.params.id });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Deleted successfully",
    data: [],
  });
});

// product  Update
exports.productUpdate = catchAsyncError(async (req, res) => {
  const data = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Updated successfully",
    data: data,
  });
});

//fetch Product by id
exports.fetchProductById = catchAsyncError(async (req, res) => {
  const product = await productModel.findById(req.params.id);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: product,
  });
});

//fetch Product
exports.getProduct = catchAsyncError(async (req, res) => {
  const product = await productModel.find({
    product_code: req.params.product_code,
  });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: product,
  });
});

//fetch Product all
exports.fetchProductAll = catchAsyncError(async (req, res) => {
  const product = await productModel.find();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: product,
  });
});

//Fetch Product by Sku type
exports.fetchProductBySkuType = catchAsyncError(async (req, res) => {
  const sku_type = req.body.sku_type;
  let filter = {};
  if (sku_type) {
    filter.sku_type = sku_type;
  }
  const product = await productModel.find(filter);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: product,
  });
});
