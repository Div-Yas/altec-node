const jcCalendarModel = require("../models/altec_jc_calendar");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { Response } = require("http-status-codez");

//Jc Calendar Fetch
exports.jcFetch = catchAsyncError(async (req, res) => {
  const jcData = await jcCalendarModel.find();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: jcData,
  });
});
