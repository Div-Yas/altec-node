const producthierarchylevelModel = require("../models/altec_product_hierarchy_level");
const hierarchyReportingLevelModel = require("../models/altec_hierarchy_reporting_level");
const catchAsyncError = require("../middlewares/catchAsyncError");
const apiHandler = require("../handler/api-handler");
const { Response } = require("http-status-codez");

//fetch ProductHierarchyLevel
exports.fetchProductHierarchyLevel = catchAsyncError(async (req, res) => {
  const productHierarchyLevel = await producthierarchylevelModel.find();
  const ProductCompany = [];
  for (const row of productHierarchyLevel) {
    const [serviceResponse] = await Promise.all([
      apiHandler.getCompanyInformation(row.company_code),
    ]);
    if (serviceResponse !== null) {
      const companyData = serviceResponse.data.data;
      const data = {
        id: row._id,
        company_code: row.company_code,
        level_code: row.level_code,
        level_name: row.level_name,
        createdat: row.createdat,
        updatedat: row.updatedat,
        companyData: [],
      };
      if (companyData.length > 0) {
        const values = Object.values(companyData[0]);
        const found = values.includes(row.company_code);
        if (found) {
          data.companyData = companyData[0];
        }
      }
      ProductCompany.push(data);
    }
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: ProductCompany,
  });
});

//create ProductHierarchyLevel
exports.createProductHierarchyLevel = catchAsyncError(async (req, res) => {
  const data = {
    company_code: req.body.company_code,
    level_code: req.body.level_code,
    level_name: req.body.level_name,
  };
  const product_count = await producthierarchylevelModel
    .find(data)
    .countDocuments();
  if (product_count != 0) {
    return res.status(409).send({
      status: false,
      message: "Already is exist",
      data: [],
    });
  }
  const getData = await producthierarchylevelModel.create(data);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: getData,
  });
});

//destroy ProductHierarchyLevel
exports.ProductHierarchyLevelDelete = catchAsyncError(async (req, res) => {
  await producthierarchylevelModel.softDelete({ _id: req.params.id });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Deleted successfully",
    data: [],
  });
});

// producthierarchylevel  Update
exports.ProductHierarchyLevelUpdate = catchAsyncError(async (req, res) => {
  const data = await producthierarchylevelModel.findByIdAndUpdate(
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

//fetch producthierarchylevel by id
exports.fetchProductHierarchyLevelById = catchAsyncError(async (req, res) => {
  const producthierarchylevel = await producthierarchylevelModel.findOne({
    _id: req.params.id,
  });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: producthierarchylevel,
  });
});

//fetch hierarchyReportingLevel by hierarchy_level_id
exports.fetchHierarchyReportingLevel = catchAsyncError(async (req, res) => {
  const hierarchyReportingLevel = await hierarchyReportingLevelModel.aggregate([
    {
      $match: {
        hierarchy_level_id: req.body.hl_code,
      },
    },
    {
      $group: {
        _id: "$_id",
        reporting_level_name: { $first: "$reporting_level_name" },
      },
    },
  ]);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: hierarchyReportingLevel,
  });
});
