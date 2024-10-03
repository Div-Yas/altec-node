const distributorStockReport = require("../models/altec_distributor_stock_report");
const customerGeneral = require("../models/altec_customer_general");
const orderBilling = require("../models/altec_order_billing");
const orderBillingItem = require("../models/altec_order_billing_item");
const creditDebitAdjustment = require("../models/altec_credit_debit_adjustment");
const catchAsyncError = require("../middlewares/catchAsyncError");
const fs = require("fs");
const ejs = require("ejs");
const htmlPDF = require("puppeteer-html-pdf");
const readFile = require("util").promisify(fs.readFile);
const axios = require("axios");
const apiHandler = require("../handler/api-handler");
const { Response } = require("http-status-codez");
const constants = require("../config/constants");

//Get Saleaman Code by Distributor Code
exports.getSalesmanCode = catchAsyncError(async (req, res) => {
  let data = {
    distributor_code: req.body.distributor_code,
    role: req.user.role,
  };
  const filter = encodeURIComponent(JSON.stringify(data));
  const serviceSalesman = await axios.all([
    apiHandler.getSalesmanInformation(filter),
  ]);
  let salesmanData = null;
  if (serviceSalesman !== null) {
    salesmanData = serviceSalesman[0].data.data;
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: salesmanData,
  });
});

//Get Route Code By Salesman Code
exports.getRouteCode = catchAsyncError(async (req, res) => {
  let filter = {
    salesman_code: req.body.salesman_code,
    distributor_code: req.body.distributor_code,
    role: req.user.role,
  };
  const getData = encodeURIComponent(JSON.stringify(filter));
  const serviceRouteMap = await axios.all([
    apiHandler.getRouteMappingInformation(getData),
  ]);

  let salesRoute = [];

  if (serviceRouteMap !== null) {
    const routeMapData = serviceRouteMap[0].data.data;

    for (let row of routeMapData) {
      const serviceRoute = await axios.all([
        apiHandler.getRouteInformation(row.route_code),
      ]);

      if (serviceRoute !== null) {
        const routeData = serviceRoute[0].data.data;
        if (routeData.length === 0) {
          const data = {
            route_code: row.route_code,
            routeInfo: [],
          };
          salesRoute.push(data);
        } else {
          const values = Object.values(routeData[0]);
          const found = values.includes(row.route_code);

          if (found) {
            const data = {
              route_code: row.route_code,
              routeInfo: {
                route_name: routeData[0].route_name,
              },
            };
            salesRoute.push(data);
          }
        }
      }
    }
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: salesRoute,
  });
});

//Get Customer by Route Code => pending select * customerGeneral
exports.getCustomer = catchAsyncError(async (req, res) => {
  let filter = {};
  if (req.user.role != constants.ROLE_ADMIN) {
    filter = {
      cg_distributor_branch: req.body.distributor_code,
      cg_salesman_code: req.body.salesman_code,
    };
  } else {
    filter = {
      cg_salesman_code: req.body.salesman_code,
    };
  }
  const CustomerGdata = await customerGeneral.find(filter);
  let customer = [];
  for (let row of CustomerGdata) {
    const filter = {
      route_code: req.body.route_code,
      cg_id: row._id,
    };
    const getData = encodeURIComponent(JSON.stringify(filter));
    const serviceCustomerCoverage = await axios.all([
      apiHandler.getCustomerCoverageInformation(getData),
    ]);
    if (serviceCustomerCoverage !== null) {
      const customerCoverage = serviceCustomerCoverage[0].data.data;
      if (customerCoverage.length === 0) {
        const data = {
          customerGeneralInfo: row,
          customerCoverageInfo: [],
        };
        customer.push(data);
      } else {
        const values = Object.values(customerCoverage[0]);
        const found = values.includes(row.product_code);
        if (found) {
          const data = {
            customerGeneralInfo: row,
            customerCoverageInfo: customerCoverage[0],
          };
          customer.push(data);
        }
      }
    }
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: customer,
  });
});

//Get product by Distributor Code
exports.getProduct = catchAsyncError(async (req, res) => {
  let filter = {};
  if (req.user.role != constants.ROLE_ADMIN) {
    filter = {
      distributorcode: req.body.distributor_code,
    };
  }
  const distributorStock = await distributorStockReport.find(filter);
  let ProductStock = [];
  for (let row of distributorStock) {
    const serviceProduct = await axios.all([
      apiHandler.getProductInformation(row.product_code),
    ]);
    if (serviceProduct !== null) {
      const productData = serviceProduct[0].data.data;

      if (productData.length === 0) {
        const data = {
          distributorInfo: row,
          productInfo: [],
        };
        ProductStock.push(data);
      } else {
        const values = Object.values(productData[0]);
        const found = values.includes(row.product_code);
        if (found) {
          const data = {
            distributorInfo: row,
            productInfo: productData[0],
          };
          ProductStock.push(data);
        }
      }
    }
  }
  const bigIntReplacer = (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
  const serializedProductStock = JSON.stringify(ProductStock, bigIntReplacer);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: JSON.parse(serializedProductStock),
  });
});

//Get Product Info
exports.getProductInfo = catchAsyncError(async (req, res) => {
  const [productServiceResponse] = await Promise.all([
    apiHandler.getProductAll(),
  ]);

  let ProductData = null;
  let ProductStock = [];

  if (productServiceResponse !== null) {
    ProductData = productServiceResponse.data.data;
  }
  var match = {
    product_code: req.body.product_code,
  };
  if (req.user.role != constants.ROLE_ADMIN) {
    matchdistributorcode = req.body.distributor_code;
  }
  const distributorStock = await distributorStockReport.aggregate([
    {
      $match: match,
    },
    { $group: { _id: "$product_code", documents: { $push: "$$ROOT" } } },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ _id: "$_id" }, { $arrayElemAt: ["$documents", 0] }],
        },
      },
    },
  ]);

  console.log(distributorStock);

  for (let row of ProductData) {
    const distributorData = distributorStock.find(
      (distributor) => distributor.product_code === row.product_code
    );

    if (distributorData) {
      const data = {
        distributorInfo: distributorData,
        productInfo: row,
      };
      ProductStock.push(data);
    }
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: ProductStock,
  });
});

// Create Order Billing
exports.createOrderBilling = catchAsyncError(async (req, res) => {
  let productCode = req.body.product.length;
  let billing_items = [];
  let orderbill = new orderBilling();
  const sequentialNumber = await orderBilling.countDocuments();
  sequentialNumber = sequentialNumber + 1;
  orderbill.order_id = `OB${sequentialNumber.toString().padStart(9, "0")}`;
  orderbill.invoice_no = `CKBIL${sequentialNumber.toString().padStart(9, "0")}`;
  orderbill = Object.assign(orderbill, req.body);
  await orderbill.save();
  let lastOrder = orderbill.order_id;
  for (let i = 0; i < productCode; i++) {
    let billing_item_datas = {
      order_id: lastOrder,
      product_code: req.body.product[i].product_code,
      product_name: req.body.product[i].product_name,
      batch: req.body.product[i].batch,
      exp_date: req.body.product[i].exp_date,
      order: req.body.product[i].order,
      order_qty: req.body.product[i].order_qty,
      inv_qty: req.body.product[i].inv_qty,
      mrp: req.body.product[i].mrp,
      sell_rate: req.body.product[i].sell_rate,
      gross_amt: req.body.product[i].gross_amt,
      line_disc_amt: req.body.product[i].line_disc_amt,
      tax_amt: req.body.product[i].tax_amt,
      net_rate: req.body.product[i].net_rate,
      net_amt: req.body.product[i].net_amt,
      hsn_code: req.body.product[i].hsn_code,
    };
    billing_items.push(billing_item_datas);
  }
  await orderBillingItem.insertMany(billing_items);
  let path = __basedir + "/assets/uploads/" + req.body.distributor_code + "/";
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  const options = {
    format: "A4",
    landscape: true,
    path:
      __basedir +
      "/assets/uploads/" +
      req.body.distributor_code +
      "/" +
      lastOrder +
      ".pdf",
  };
  const pdfData = {
    billingData: {
      item_count: req.body.product.length,
      invoice_number: lastOrder,
      invoice_date: new Date("d/m/Y"),
      salesman_code: req.body.salesman_code,
      route_code: req.body.route_code,
      customer_code: req.body.customer_code,
      distributor_code: req.body.distributor_code,
      order_qty: req.body.order_qty,
      cash_dist_amt: req.body.cash_dist_amt,
      scheme_dist_amt: req.body.scheme_dist_amt,
      total_invoice_qty: req.body.total_invoice_qty,
      credit_note_adjustment: req.body.credit_note_adjustment,
      debit_note_adjustment: req.body.debit_note_adjustment,
      gross_amount: req.body.gross_amount,
      total_addition: req.body.total_addition,
      total_deduction: req.body.total_deduction,
      net_amount: req.body.net_amount,
    },
    productData: req.body.product,
  };
  const html = await readFile("views/billing.ejs", "utf8");
  const template = ejs.compile(html);
  const content = template(pdfData);
  await htmlPDF.create(content, options);
  res.attachment(lastOrder + ".pdf");
  return res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfullyy",
    data: orderbill,
  });
});

// Fetch Order Billing List
exports.fetchOrderBilling = catchAsyncError(async (req, res) => {
  const query = {};
  if (req.user.role == constants.ROLE_DISTRIBUTOR) {
    query.distributor_code = req.body.distributor_code;
  }
  const orderBill = await orderBilling.find(query);
  let OrderDetails = [];

  for (let row of orderBill) {
    let data = {};

    const serviceSalesmanInfo = await axios.all([
      apiHandler.getSalesmanInformationBySalescode(row.salesman_code),
      apiHandler.getRouteInformation(row.route_code),
      apiHandler.getCustomerGenerals(row.customer_code),
    ]);

    if (serviceSalesmanInfo !== null) {
      const salesData = serviceSalesmanInfo[0].data.data;
      const routeData = serviceSalesmanInfo[1].data.data;
      const customerData = serviceSalesmanInfo[2].data.data;

      data["orderInfo"] = row;

      if (salesData.length === 0) {
        data["salesmanInfo"] = [];
      } else {
        const salesValues = Object.values(salesData[0]);
        const salesFound = salesValues.includes(row.salesman_code);
        if (salesFound) {
          data["salesmanInfo"] = salesData[0];
        }
      }

      if (routeData.length === 0) {
        data["routeInfo"] = [];
      } else {
        const routeValues = Object.values(routeData[0]);
        const routeFound = routeValues.includes(row.route_code);
        if (routeFound) {
          data["routeInfo"] = routeData[0];
        }
      }

      if (customerData.length === 0) {
        data["customerInfo"] = [];
      } else {
        const customerValues = Object.values(customerData[0]);
        const customerFound = customerValues.includes(row.customer_code);
        if (customerFound) {
          data["customerInfo"] = customerData[0];
        }
      }

      OrderDetails.push(data);
    }
  }

  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: OrderDetails,
  });
});

//Get Order Billing info
exports.getOrderBilling = catchAsyncError(async (req, res) => {
  let order_id = req.body.order_id;
  const billingItem = await orderBillingItem.find({ order_id: order_id });
  const orderBill = await orderBilling.find({
    order_id: order_id,
  });
  let OrderDetails = [];
  for (let row of orderBill) {
    let data = {};
    const serviceSalesmanInfo = await axios.all([
      apiHandler.getSalesmanInformationBySalescode(row.salesman_code),
      apiHandler.getRouteInformation(row.route_code),
      apiHandler.getCustomerGenerals(row.customer_code),
    ]);
    if (serviceSalesmanInfo !== null) {
      const salesData = serviceSalesmanInfo[0].data.data;
      const routeData = serviceSalesmanInfo[1].data.data;
      const customerData = serviceSalesmanInfo[2].data.data;

      data["orderInfo"] = row;

      if (salesData.length === 0) {
        data["salesmanInfo"] = [];
      } else {
        const salesValues = Object.values(salesData[0]);
        const salesFound = salesValues.includes(row.salesman_code);
        if (salesFound) {
          data["salesmanInfo"] = salesData[0];
        }
      }

      if (routeData.length === 0) {
        data["routeInfo"] = [];
      } else {
        const routeValues = Object.values(routeData[0]);
        const routeFound = routeValues.includes(row.route_code);
        if (routeFound) {
          data["routeInfo"] = routeData[0];
        }
      }

      if (customerData.length === 0) {
        data["customerInfo"] = [];
      } else {
        const customerValues = Object.values(customerData[0]);
        const customerFound = customerValues.includes(row.customer_code);
        if (customerFound) {
          data["customerInfo"] = customerData[0];
        }
      }

      OrderDetails.push(data);
    }
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: { order: OrderDetails, orderInfo: billingItem },
  });
});

//Get Credit Debit Adjustment list
exports.getCreditDebitAdjustmentList = catchAsyncError(async (req, res) => {
  let distributor_code = req.body.distributor_code;
  let customer_code = req.body.customer_code;
  const data = await creditDebitAdjustment.find({
    distributor_code: distributor_code,
    customer_code: customer_code,
  });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: data,
  });
});

//Stock Report Insert
exports.distributorStockReportInsert = catchAsyncError(async (req, res) => {
  const stockReport = distributorStockReport.create(req.body);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: stockReport,
  });
});

//Credit Debit Adjustment Insert
exports.creditDebitAdjustmentInsert = catchAsyncError(async (req, res) => {
  const creditDebitAdjustmentData = creditDebitAdjustment.create(req.body);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: creditDebitAdjustmentData,
  });
});

//get distribution stock report
exports.getDistributorStockReport = catchAsyncError(async (req, res) => {
  const stockReport = await distributorStockReport.findOne({
    distributorcode: req.params.distributor_code,
  });
  const bigIntReplacer = (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
  const serializedProductStock = JSON.stringify(stockReport, bigIntReplacer);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: serializedProductStock,
  });
});

// Get Distributor branch code from distributor stock report
exports.getDistributorBranchCode = catchAsyncError(async (req, res) => {
  let filter = {};
  if (req.user.role != constants.ROLE_ADMIN) {
    filter = {
      distributorcode: req.params.distributor_code,
    };
  }
  const stockReport = await distributorStockReport.aggregate([
    {
      $match: filter,
    },
    {
      $group: {
        _id: {
          distributor_br_code: "$distributor_br_code",
        },
        distributor_br_code: { $first: "$distributor_br_code" },
      },
    },
  ]);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: { distributor_br_code: stockReport },
  });
});
