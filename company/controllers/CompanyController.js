const companyModel = require("../models/altec_company");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { Response } = require("http-status-codez");
const axios = require("axios");
const apiHandler = require("../handler/api-handler");
const { format } = require("date-fns");

//Company Insert
exports.companyInsert = catchAsyncError(async (req, res) => {
  let company = new companyModel();
  company = Object.assign(company, req.body);
  await company.save();
  res.status(Response.HTTP_CREATED).send({
    status: true,
    message: "Data Added successfully",
    data: company,
  });
});

//Company Update
exports.companyUpdate = catchAsyncError(async (req, res) => {
  const company = await companyModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Updated successfully",
    data: company,
  });
});

//Company Fetch by Id
exports.companyFetch = catchAsyncError(async (req, res) => {
  const company = await companyModel.findById(req.params.id);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: company,
  });
});

//Company Fetch All
exports.companyFetchAll = catchAsyncError(async (req, res) => {
  const company = await companyModel.find();
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: company,
  });
});

// Company Delete
exports.companyDelete = catchAsyncError(async (req, res) => {
  await companyModel.softDelete({ _id: req.params.id });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Deleted successfully",
    data: [],
  });
});

//Inner api conncention
exports.fetchCompany = catchAsyncError(async (req, res, next) => {
  const company = await companyModel.findOne({
    company_code: req.params.company_code,
  });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: company,
  });
});

//Get Invoice Details
exports.getInvoiceDetails = catchAsyncError(async (req, res) => {
  let distributor_code = req.body.distributor_code;
  const [serviceSapInvoice] = await axios.all([
    apiHandler.getInvoiceList(distributor_code),
  ]);
  let sapInvoiceData = {};
  if (serviceSapInvoice !== null) {
    sapInvoiceData = serviceSapInvoice.data.data;
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: sapInvoiceData,
  });
});

//Get Invoice Numbers
exports.geInvoiceNo = catchAsyncError(async (req, res) => {
  const [serviceSapInvoiceNo] = await axios.all([
    apiHandler.getInvoiceNos(req.body.distributor_code),
  ]);
  let sapInvoiceNoData = {};
  if (serviceSapInvoiceNo !== null) {
    sapInvoiceNoData = serviceSapInvoiceNo.data.data;
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: sapInvoiceNoData,
  });
});

//get big int replacer
const bigIntReplacer = (key, value) => {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
};

//Get Single Invoice Details
exports.getSingleInvoiceDetails = catchAsyncError(async (req, res) => {
  let filter = {
    comp_inv_no: req.body.invoice_number,
    status: req.body.status,
  };
  const getData = encodeURIComponent(JSON.stringify(filter));
  const [serviceSapInvoiceDetails] = await axios.all([
    apiHandler.getSingleInvoiceInfo(getData),
  ]);
  let sapInvoiceData = {};
  if (serviceSapInvoiceDetails !== null) {
    sapInvoiceData = serviceSapInvoiceDetails.data.data;
  }

  sapInvoiceData = Array.isArray(sapInvoiceData)
    ? sapInvoiceData
    : Object.values(sapInvoiceData);
  const distributorStock = await Promise.all(
    sapInvoiceData.map(async (row) => {
      const serviceDistributorStock = await apiHandler.getDistributorStock(
        row.distr_code
      );
      let getStock = {};
      if (serviceDistributorStock !== null) {
        getStock = serviceDistributorStock.data.data;
      }
      return JSON.parse(getStock, bigIntReplacer);
    })
  );
  const formatNumber = (value) =>
    new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(value);

  let total = {
    tot_disc_Amt: 0,
    tot_gross_Amt: 0,
    tot_tax_Amt: 0,
    tot_net_Amt: 0,
  };

  sapInvoiceData.forEach((row) => {
    total.tot_disc_Amt += row.tot_disc_amt;
    total.tot_gross_Amt += row.tot_gross_amt;
    total.tot_tax_Amt += row.tot_tax_amt;
    total.tot_net_Amt += row.tot_net_amt;
  });

  total.tot_disc_Amt = formatNumber(total.tot_disc_Amt);
  total.tot_gross_Amt = formatNumber(total.tot_gross_Amt);
  total.tot_tax_Amt = formatNumber(total.tot_tax_Amt);
  total.tot_net_Amt = formatNumber(total.tot_net_Amt);

  const companyData = await companyModel
    .findOne({
      company_code: sapInvoiceData[0].supplierInfo.company_code,
    })
    .select("company_name");
  const purchase_details = sapInvoiceData[0].purchase_invoice_details_list;
  let prd_code = [];
  let purchase_rate = [];
  let taxAmt = [];
  let grossAmt = [];
  let netAmt = [];
  let discAmt = [];
  let prdname = [];
  let mrp_round = [];

  for (const value of purchase_details) {
    const purchase_price = formatNumber(value.purchPrice);
    const tot_taxAmt = formatNumber(value.lltaxAmt);
    const tot_GrossAmt = formatNumber(value.llGrossAmt);
    const tot_NetAmt = formatNumber(value.llnetAmt);
    const tot_DiscAmt = formatNumber(value.discAmtLl);
    const mrp = formatNumber(value.mrp);

    const [serviceSapProduct] = await Promise.all([
      apiHandler.getSapProductInfo(value.prodCode),
    ]);

    let sapProductData = {};
    if (serviceSapProduct !== null) {
      sapProductData = serviceSapProduct.data.data;
    }

    mrp_round.push(mrp);
    purchase_rate.push(purchase_price);
    taxAmt.push(tot_taxAmt);
    grossAmt.push(tot_GrossAmt);
    netAmt.push(tot_NetAmt);
    discAmt.push(tot_DiscAmt);
    prd_code.push(value.prodCode);
    prdname.push(sapProductData.product_name);
  }
  let cal_data = {
    mrp: 0,
    prod_name: 0,
    purchase_rate: 0,
    taxAmt: 0,
    GrossAmt: 0,
    netAmt: 0,
    discAmtLl: 0,
  };
  sapInvoiceData.forEach((row) => {
    cal_data.mrp = mrp_round;
    cal_data.prod_name = prdname;
    cal_data.purchase_rate = purchase_rate;
    cal_data.taxAmt = taxAmt;
    cal_data.GrossAmt = grossAmt;
    cal_data.netAmt = netAmt;
    cal_data.discAmtLl = discAmt;
    row.tot_disc_Amt_full = formatNumber(row.tot_disc_amt);
    row.tot_gross_Amt_full = formatNumber(row.tot_gross_amt);
    row.tot_tax_Amt_full = formatNumber(row.tot_tax_amt);
    row.tot_net_Amt_full = formatNumber(row.tot_net_amt);
  });
  let sap = sapInvoiceData[0];
  const date_ob = new Date();
  const date = format(date_ob, "Y-MM-dd");
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: { sap, companyData, date, distributorStock, cal_data },
  });
});
