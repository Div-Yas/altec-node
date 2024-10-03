const altecDistributor = require("../models/altec_distributor");
const altecSalesmanDistributorMapping = require("../models/altec_salesman_distributor_mapping");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { Response } = require("http-status-codez");
const constants = require("../config/constants");
const axiosErrorHandler = require("../middlewares/axiosErrorHandler");
const { format } = require("date-fns");

// Create Distributor
exports.createDistributor = catchAsyncError(async (req, res) => {
  let distributor = new altecDistributor();
  distributor.password = "12345678";
  distributor.created_by = req.user._id;
  distributor = Object.assign(distributor, req.body);
  const details = {
    username: req.body.distributor_name,
    password: "12345678",
    mobileno: req.body.phone_no,
    email: req.body.email_id,
    companyid: "12345",
    role: constants.ROLE_DISTRIBUTOR,
    distributor_code: req.body.distributor_code,
    salesman_code: null,
  };
  try {
    await axiosErrorHandler.post(
      `${constants.AUTH_BACKEND_URL}/api/auth/user/register`,
      details
    );
  } catch (error) {
    return res.status(error.status).send(error.data);
  }
  await distributor.save();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: distributor,
  });
});

// Get Distributor List
exports.getDistributorList = catchAsyncError(async (req, res) => {
  const distributorList = await altecDistributor.find();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: distributorList,
  });
});

// Get Single Distributor
exports.getSingleDistributor = catchAsyncError(async (req, res) => {
  const distributor = await altecDistributor.findById(req.params.id);
  const date = format(distributor.dl_expiry_date, "Y-MM-dd");
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: distributor,
  });
});

// Update Distributor
exports.updateDistributor = catchAsyncError(async (req, res) => {
  const distributor = await altecDistributor.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Updated successfully",
    data: distributor,
  });
});

// Delete Distributor
exports.deleteDistributor = catchAsyncError(async (req, res) => {
  await altecDistributor.softDelete({ _id: req.params.id });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Deleted successfully",
    data: [],
  });
});

// //get all distributor by list
// exports.getDistributors = catchAsyncError(async (req, res) => {
//   const distributors = await altecDistributor.aggregate([
//     {
//       $group: {
//         _id: "$distributor_code",
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         distributor_code: "$_id",
//       },
//     },
//   ]);

//   res.status(Response.HTTP_OK).send({
//     status: true,
//     message: "Data Fetched successfully",
//     data: distributors,
//   });
// });

// Get distributor using salesman code
exports.getDistributorBySalesmanCode = catchAsyncError(async (req, res) => {
  //  Join altec distributor and salesman altec Salesman Distributor Mapping mapping
  const distributor = await altecSalesmanDistributorMapping.aggregate([
    {
      $match: {
        salesman_code: req.params.salesman_code,
      },
    },
    {
      $lookup: {
        from: "altec_distributors",
        localField: "distributor_code",
        foreignField: "distributor_code",
        as: "distributor",
      },
    },
    {
      $unwind: "$distributor",
    },
    {
      $project: {
        _id: 0,
        distributor: 1,
      },
    },
  ]);

  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: distributor,
  });
});
