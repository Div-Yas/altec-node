const distributorStockReport = require("../models/altec_distributor_stock_report");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { Response } = require("http-status-codez");

//current distributor stock list
exports.getStockList = catchAsyncError(async (req, res) => {
  const stockList = await distributorStockReport.find({
    distributorcode: req.body.distributor_code,
  });
  res.status(Response.HTTP_OK).send({
    statu: true,
    message: "Data Fetched Successfully",
    data: stockList,
  });
});
