const salesreturnModel = require("../models/altec_sales_return");
const salesreturnitemModel = require("../models/altec_sales_return_item");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { Response } = require("http-status-codez");
const constants = require("../config/constants");

//fetch sales return
exports.fetchSalesReturn = catchAsyncError(async (req, res, next) => {
  let salesReturn = null;
  if (req.user.role == constants.ROLE_ADMIN) {
    salesReturn = await salesreturnModel.find();
  } else if (req.user.role == constants.ROLE_DISTRIBUTOR) {
    salesReturn = await salesreturnModel.find({
      distributor_code: req.body.distributor_code,
    });
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: salesReturn,
  });
});

//fetch sales return item by saleman id
exports.fetchSalesReturnItem = catchAsyncError(async (req, res, next) => {
  const salesReturnItem = await salesreturnitemModel.find({
    sales_return_id: req.params.sales_return_id,
  });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: salesReturnItem,
  });
});

//sales return create
exports.salesReturnCreate = catchAsyncError(async (req, res, next) => {
  const salesReturn = await salesreturnModel.create(req.body);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: salesReturn,
  });
});

//sales return item cretae
exports.salesReturnItemcreate = catchAsyncError(async (req, res, next) => {
  const salesReturnItem = await salesreturnitemModel.create(req.body);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: salesReturnItem,
  });
});
