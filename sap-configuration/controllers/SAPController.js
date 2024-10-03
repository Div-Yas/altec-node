const sapPurchaseInvoice = require("../models/altec_sap_purchase_invoice");
const sapApprovedProduct = require("../models/altec_sap_approved_product");
const sapSupplierMaster = require("../models/altec_sap_supplier_master");
const sapProductMaster = require("../models/altec_sap_product_master");
const { Response } = require("http-status-codez");
const catchAsyncError = require("../middlewares/catchAsyncError");
const constants = require("../config/constants");
const { format } = require("date-fns");
const axios = require("axios");
const apiHandler = require("../handler/api-handler");

//get Purchase Invoice Info
exports.getPurchaseInvoice = catchAsyncError(async (req, res) => {
  const purchaseData = await sapPurchaseInvoice.aggregate([
    {
      $match: {
        status: constants.APPROVED,
        distr_code: req.params.distributor_code,
      },
    },
    {
      $lookup: {
        from: "altec_sap_supplier_masters",
        localField: "supp_code",
        foreignField: "supplier_code",
        as: "supplierInfo",
      },
    },
    {
      $unwind: "$supplierInfo", // Inner Join
    },
    {
      $project: {
        _id: 0,
        sapPurchaseInvoice: "$$ROOT",
      },
    },
  ]);
  let supplierName = [];
  let grnToAmt = [];
  let companyName = [];
  if (Array.isArray(purchaseData)) {
    const promises = purchaseData.map(async (row) => {
      supplierName.push(row.sapPurchaseInvoice.supplierInfo.name);

      grnToAmt.push(row.sapPurchaseInvoice.tot_net_amt.toFixed(2));

      try {
        const serviceCompany = await apiHandler.getCompanyList(
          row.sapPurchaseInvoice.supplierInfo.company_code
        );
        if (serviceCompany !== null) {
          companyName.push(serviceCompany.data.data.company_name);
        }
      } catch (error) {
        console.error("Error fetching company info:", error);
      }
    });
    await Promise.all(promises);
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: {
      result: purchaseData,
      supplier_name: supplierName,
      date: format(new Date(), "dd-MM-yyyy"),
      grn_net_amt: grnToAmt,
      company_name: companyName,
    },
  });
});

//get Purchase Invoice No
exports.getPurchaseInvoiceNo = catchAsyncError(async (req, res) => {
  const purchaseInvoiceNo = await sapPurchaseInvoice
    .find({
      distr_code: req.params.distributor_code,
      status: constants.PENDING,
    })
    .select("comp_inv_no");
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: purchaseInvoiceNo,
  });
});

//get purchase invoice by distribution code
exports.getSapPurchase = catchAsyncError(async (req, res) => {
  const purchaseData = await sapPurchaseInvoice.find({
    distr_code: req.params.distributor_code,
  });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: purchaseData,
  });
});

//get Approved product by product id
exports.getSapApproved = catchAsyncError(async (req, res) => {
  const approvedData = await sapApprovedProduct.find(
    JSON.parse(req.params.filter)
  );
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: approvedData,
  });
});

//get Purchase invoice by filter
exports.getSapPurchaseInvoice = catchAsyncError(async (req, res) => {
  const purchaseData = await sapPurchaseInvoice.find(
    JSON.parse(req.params.filter)
  );
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: purchaseData,
  });
});

//get Approved count
exports.getSapApprovedCount = catchAsyncError(async (req, res) => {
  const purchaseCount = await sapApprovedProduct.countDocuments();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: purchaseCount,
  });
});

//create Product Approduct
exports.createApprovedProduct = catchAsyncError(async (req, res) => {
  const product = await sapApprovedProduct.create(req.body);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: product,
  });
});

//fetch approved products
exports.ApprovedProductByBillno = catchAsyncError(async (req, res) => {
  const productInfo = await sapApprovedProduct.find({
    bill_no: req.params.bill_no,
  });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetch successfully",
    data: productInfo,
  });
});

//Get Single Invoice Details
exports.getInvoice = catchAsyncError(async (req, res) => {
  const filter = JSON.parse(req.params.filter);
  const [PurchaseInvoice] = await sapPurchaseInvoice.aggregate([
    {
      $match: filter,
    },
    {
      $lookup: {
        from: "altec_sap_supplier_masters",
        localField: "supp_code",
        foreignField: "supplier_code",
        as: "supplierInfo",
      },
    },
    {
      $unwind: "$supplierInfo",
    },
    {
      $project: {
        _id: 0,
        sapPurchaseInvoice: "$$ROOT",
      },
    },
  ]);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: " Data Fetched successfully",
    data: PurchaseInvoice,
  });
});

//get Sap product data
exports.getProductData = catchAsyncError(async (req, res) => {
  const productInfo = await sapProductMaster
    .findOne({
      product_code: req.params.product_code,
    })
    .select("product_name");
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetch successfully",
    data: productInfo,
  });
});

//goods rescipt submit
exports.goodsResciptSubmit = catchAsyncError(async (req, res) => {
  const randomInteger = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
  const result = `GRN0000000${randomInteger}`;
  const date = new Date();
  const date_ob = format(date, "Y-MM-dd");
  const serviceSapPurchase = await sapPurchaseInvoice.updateOne(
    { comp_inv_no: req.params.invoice_number },
    {
      status: constants.APPROVED,
      grn_number: result,
      approved_date: date_ob,
    },
    {
      new: true,
    }
  );
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetch successfully",
    data: [],
  });
});
