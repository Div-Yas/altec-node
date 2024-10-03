const orderitemModel = require("../models/altec_order_item");
const orderModel = require("../models/altec_order");
const catchAsyncError = require("../middlewares/catchAsyncError");
const axios = require("axios");
const axiosErrorHandler = require("../middlewares/axiosErrorHandler");
const apiHandler = require("../handler/api-handler");
const { Response } = require("http-status-codez");
const constants = require("../config/constants");
const fs = require("fs");
const ejs = require("ejs");
const htmlPDF = require("puppeteer-html-pdf");
const readFile = require("util").promisify(fs.readFile);
const { format } = require("date-fns");

//Created Order Booking
exports.createOrder = catchAsyncError(async (req, res) => {
  let data = req.body.people;
  let total_amount = 0;
  let tax_amount = 0;
  if (data) {
    data.forEach((row) => {
      total_amount = total_amount + row["gross_amt"];
      tax_amount = tax_amount + row["tax_amt"] * row["order_qty"];
    });
  }
  const order = await orderModel.create({
    salesman_code: req.body.salesman_code,
    customer_code: req.body.customer_code,
    distributor_code: req.body.distributor_code,
    order_id: req.body.order_id,
    signature: "",
    queue: "",
    total_amount: total_amount,
    tax_amount: tax_amount,
    discount: 0,
  });
  data.forEach((row) => {
    orderitemModel.create({
      order_id: req.body.order_id,
      product_id: row["product_code"],
      product_name: row["product_name"],
      quantity: row["order_qty"],
      ptr: row["sell_rate"],
      tentative_discount: 0,
      tax_percentage: row["tax_amt"] * row["order_qty"],
      tentative_line_value:
        row["sell_rate"] * row["order_qty"] + row["tax_amt"] * row["order_qty"],
      quantity_type: row["uom"],
      scheme_id: "0",
    });
  });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Added successfully",
    data: order,
  });
});

//fetch fresh Order
exports.fetchFreshOrder = catchAsyncError(async (req, res) => {
  const order = await orderModel.find({
    distributor_code: req.body.distributor_code,
    status: req.body.status,
  });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: order,
  });
});

// fetch order item
exports.fetchOrderItem = catchAsyncError(async (req, res) => {
  filter = { order_id: req.body.orderId };
  const orderitem = await orderitemModel.find(filter);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: orderitem,
  });
});

//Update to declined Order
exports.statusUpdate = catchAsyncError(async (req, res) => {
  filter = { order_id: req.body.orderId };
  const order = await orderModel.updateOne(
    filter,
    {
      status: req.body.status,
    },
    {
      new: true,
    }
  );
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: order,
  });
});

// fecth date and time
exports.fetchDateTime = catchAsyncError(async (req, res) => {
  var date_ob = new Date();
  var date = format(date_ob, "dd/MM/yyyy");
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: date,
  });
});

//fetch Salesman info
exports.fetchSalesmanInfo = catchAsyncError(async (req, res) => {
  let data = {
    distributor_code: req.body.distributor_code,
    role: req.user.role,
  };
  const filter = encodeURIComponent(JSON.stringify(data));
  const serviceSalesman = await axios.all([
    apiHandler.getSalesmanInformation(filter),
  ]);
  let SalesmanData = null;
  if (serviceSalesman !== null) {
    SalesmanData = serviceSalesman[0].data.data;
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: SalesmanData,
  });
});

//fetch Queue information
exports.fetchQueueInformation = catchAsyncError(async (req, res) => {
  const queue = await orderModel.find({
    distributor_code: req.body.distributor_code,
    queue: constants.QUEUE_YES,
  });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: queue,
  });
});

//fetch Queue information order item
exports.fetchQueueItem = catchAsyncError(async (req, res) => {
  const queueItem = await orderitemModel.find({
    order_id: req.body.orderId,
    queue: constants.QUEUE,
    status: constants.QUEUE_YES,
  });
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: queueItem,
  });
});

//fetch product
exports.fetchProduct = catchAsyncError(async (req, res) => {
  const bill_no = req.body.bill_no;
  const distributor_code = req.body.distributor_code;
  const orderitem = await orderitemModel.find({
    order_id: bill_no,
  });
  const [serviceSap] = await axios.all([
    apiHandler.getSapInformation(distributor_code),
  ]);
  let sapData = null;
  if (serviceSap !== null) {
    sapData = serviceSap.data.data;
  }
  let invoice_prodcode = [];
  let pro_array = [];
  if (sapData) {
    sapData.forEach((value) => {
      const purchase_details = value["purchase_invoice_details_list"];
      for (const prod_val of purchase_details) {
        invoice_prodcode.push(prod_val["prodCode"]);
        pro_array.push({
          prodCode: prod_val["prodCode"],
          invQty: prod_val["invQty"],
        });
      }
    });
  }

  const pass_array = [];

  for (const ord of orderitem) {
    const res = search(pro_array, "prodCode", ord["product_id"]);
    const pro_qty = [];
    for (const varItem of res) {
      pro_qty.push(varItem["invQty"]);
    }
    const invSumQty = pro_qty.reduce((sum, qty) => sum + qty, 0);
    const order = await orderModel.find({
      distributor_code: distributor_code,
    });
    let sapApprovedData = null;
    for (const data of order) {
      const filter = {
        product_id: ord["product_id"],
        bill_no: data.order_id,
      };
      const getData = encodeURIComponent(JSON.stringify(filter));
      const [serviceSapApproved] = await axios.all([
        apiHandler.getSapApprovedInformation(getData),
      ]);

      if (serviceSapApproved !== null) {
        sapApprovedData = serviceSapApproved.data.data;
      }
    }

    const apqty = [];
    if (sapApprovedData) {
      for (const apval of sapApprovedData) {
        apqty.push(apval["quantity"]);
      }
    }
    const appSumQty = apqty.reduce((sum, qty) => sum + qty, 0);
    const sum_of_qty = invSumQty - appSumQty;
    let ava_qty, rem_qty, color;
    if (sum_of_qty < 0) {
      ava_qty = 0;
      rem_qty = 0;
      color = "bg_grey";
    } else {
      ava_qty = sum_of_qty;
      const r_qty = sum_of_qty - ord["quantity"];
      if (r_qty < 0) {
        rem_qty = 0;
        color = "bg_grey";
      } else {
        rem_qty = r_qty;
        color = "bg_green";
      }
    }

    pass_array.push({
      order_id: ord["order_id"],
      product_id: ord["product_id"],
      product_name: ord["product_name"],
      available_qty: ava_qty,
      request_qty: ord["quantity"],
      remain_qty: rem_qty,
      color_code: color,
      ptr: ord["ptr"],
      tentative_discount: ord["tentative_discount"],
      tax_percentage: ord["tax_percentage"],
      tentative_line_value: ord["tentative_line_value"],
      quantity_type: ord["quantity_type"],
      scheme_id: ord["scheme_id"],
    });
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Fetched successfully",
    data: pass_array,
  });
});

//fetch product -sub func
const search = (array, key, value) => {
  let results = [];

  function searchRecursively(obj) {
    if (typeof obj === "object" && obj !== null) {
      if (obj[key] === value) {
        results.push(obj);
      }

      if (Array.isArray(obj)) {
        for (const item of obj) {
          searchRecursively(item);
        }
      } else {
        for (const subObj of Object.values(obj)) {
          searchRecursively(subObj);
        }
      }
    }
  }

  searchRecursively(array);
  return results;
};

//Approved Order products
exports.approvedOrderProduct = catchAsyncError(async (req, res) => {
  const billNo = req.body.bill_no;
  const order = await orderModel.findOne({ order_id: billNo });

  const filter = {
    distr_code: order.distributor_code,
    status: constants.APPROVED_ORDER,
  };
  const getData = encodeURIComponent(JSON.stringify(filter));
  const [serviceApprovedSap] = await axios.all([
    apiHandler.getSapPurchaseInformation(getData),
  ]);

  let sapApprovedData = null;
  if (serviceApprovedSap !== null) {
    sapApprovedData = serviceApprovedSap.data.data;
  }

  if (sapApprovedData) {
    const pro_array = [];

    sapApprovedData.forEach((value) => {
      const purchase_details = value.purchase_invoice_details_list;
      purchase_details.forEach((prod_val) => {
        pro_array.push({
          prodCode: prod_val.prodCode,
          invQty: prod_val.invQty,
        });
      });
    });

    const order_filter = {
      order_id: billNo,
    };
    if (order.queue == constants.QUEUE_YES) {
      order_filter.queue = constants.QUEUE;
    }

    const orderItems = await orderitemModel.find(order_filter);

    if (orderItems && orderItems.length > 0) {
      const [serviceApprovedCount] = await axios.all([
        apiHandler.getApprovedCount(),
      ]);

      let sapApprovedCount = null;

      if (serviceApprovedCount !== null) {
        sapApprovedCount = serviceApprovedCount.data.data;
      }

      let inv_no = null;

      if (sapApprovedCount) {
        sapApprovedCount += 1;
        inv_no = `INV${sapApprovedCount.toString().padStart(9, "0")}`;
      }
      for (const value of orderItems) {
        if (value.queue === constants.QUEUE) {
          // Update queue status in the 'ordered_items' collection
          await orderitemModel.updateOne(
            { product_id: value.product_id, queue: constants.QUEUE },
            { queue: "" }
          );
        }

        const res = search(pro_array, "prodCode", value.product_id);
        const pro_qty = [];
        for (const varItem of res) {
          pro_qty.push(parseInt(varItem["invQty"]));
        }

        const invProdSumQty = pro_qty.reduce((sum, qty) => sum + qty, 0);
        const order_dis = await orderModel.find({
          distributor_code: order.distributor_code,
        });

        let Approved_Data = [];

        for (const data of order_dis) {
          const filter = {
            bill_no: data.order_id,
            product_id: value.product_id,
          };
          const getData = encodeURIComponent(JSON.stringify(filter));
          const [serviceSapApproved] = await axios.all([
            apiHandler.getSapApprovedInformation(getData),
          ]);

          if (serviceSapApproved !== null) {
            Approved_Data.push(...serviceSapApproved.data.data);
          }
        }

        const apqty = [];
        if (Approved_Data.length > 0) {
          for (const apval of Approved_Data) {
            apqty.push(parseInt(apval["quantity"]));
          }
        }
        const appSumQty = apqty.reduce((sum, qty) => sum + qty, 0);
        const prod_sum_of_qty = Math.abs(invProdSumQty - appSumQty);
        const proqsum = Math.abs(prod_sum_of_qty - value["quantity"]);
        const que = [];

        if (prod_sum_of_qty == 0 && value["quantity"] != "0") {
          await orderitemModel.updateOne(
            { product_id: value["product_id"] },
            { queue: constants.QUEUE }
          );
          que.push(constants.QUEUE_YES);
        } else if (
          prod_sum_of_qty != 0 &&
          value["quantity"] != 0 &&
          proqsum < 0
        ) {
          await orderitemModel.create({
            order_id: billNo,
            product_id: value["product_id"],
            product_name: value["product_name"],
            quantity: proqsum,
            quantity_type: value["quantity_type"],
            scheme_id: value["scheme_id"],
            tax_percentage: value["tax_percentage"],
            tentative_discount: value["tentative_discount"],
            tentative_line_value: value["tentative_line_value"],
            ptr: value["ptr"],
            status: constants.QUEUE_YES,
            queue: constants.QUEUE,
          });
          const data = {
            bill_no: billNo,
            product_id: value["product_id"],
            product_name: value["product_name"],
            quantity: prod_sum_of_qty,
            invoiceNumber: inv_no,
            status: constants.APPROVED_ORDER,
          };
          try {
            await axiosErrorHandler.post(
              `${constants.SAP_BACKEND_URL}/api/sap/approved/create`,
              data
            );
          } catch (error) {
            return res.status(error.status).send(error.data);
          }
          que.push(constants.QUEUE_YES);
        } else {
          const data_ = {
            bill_no: billNo,
            product_id: value["product_id"],
            product_name: value["product_name"],
            quantity: value["quantity"],
            invoice_number: inv_no,
            status: constants.APPROVED_ORDER,
          };
          try {
            await axiosErrorHandler.post(
              `${constants.SAP_BACKEND_URL}/api/sap/approved/create`,
              data_
            );
          } catch (error) {
            return res.status(error.status).send(error.data);
          }
          que.push(constants.QUEUE_NO);
        }

        const queue = que.includes("yes") ? "yes" : "no";
        const update = await orderModel.updateOne(
          { order_id: billNo },
          {
            status: constants.APPROVED_ORDER,
            queue: queue,
          }
        );

        if (update) {
          let fetch_ApprovedData = null;
          const [serviceApprovedProduct] = await axios.all([
            apiHandler.getSapApprovedProductInformation(billNo),
          ]);

          if (serviceApprovedProduct !== null) {
            fetch_ApprovedData = serviceApprovedProduct.data.data;
          }

          if (fetch_ApprovedData) {
            const invoinceData = {
              product: fetch_ApprovedData,
              bill_no: billNo,
              invoice_date: Date.now(),
              salesman_code: order["salesman_code"],
            };
            let path = __basedir + "/assets/uploads/invoice/";
            if (!fs.existsSync(path)) {
              fs.mkdirSync(path);
            }
            const options = {
              format: "A4",
              landscape: true,
              path: __basedir + "/assets/uploads/invoice/" + inv_no + ".pdf",
            };
            const filename = inv_no + ".pdf";
            const html = await readFile("views/tax_invoice.ejs", "utf8");
            const template = ejs.compile(html);
            const content = template(invoinceData);
            await htmlPDF.create(content, options);
            await orderModel.updateOne(
              {
                order_id: billNo,
              },
              {
                invoice_pdf: filename,
              },
              {
                new: true,
              }
            );
          }
        }
      }
    }
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Updated successfully",
    data: [],
  });
});

//declined pending orders
exports.declinePendingOrders = catchAsyncError(async (req, res) => {
  const orderDeclined = await orderModel.updateOne(
    {
      order_id: req.body.order_id,
      distributor_code: req.body.distributor_code,
    },
    {
      status: constants.STATUS_DECLINED,
    },
    {
      new: true,
    }
  );
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Updated successfully",
    data: [],
  });
});

// Update the request quantity
exports.updateOrderItem = catchAsyncError(async (req, res) => {
  for (const order_data of req.body) {
    const orderitem = await orderitemModel.updateOne(
      {
        order_id: order_data.order_id,
        product_id: order_data.product_id,
      },
      {
        quantity: order_data.quantity,
      },
      {
        new: true,
      }
    );
  }
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Updated successfully",
    data: [],
  });
});

//fetch Approved Product
exports.approvedOrderList = catchAsyncError(async (req, res) => {
  const bill_no = req.body.bill_no;
  let fetch_ApprovedData = null;
  const serviceApprovedProduct =
    await apiHandler.getSapApprovedProductInformation(bill_no);

  if (
    serviceApprovedProduct &&
    serviceApprovedProduct.data &&
    serviceApprovedProduct.data.data
  ) {
    fetch_ApprovedData = serviceApprovedProduct.data.data;
  }

  let fetchArray = [];

  if (fetch_ApprovedData) {
    for (const value of fetch_ApprovedData) {
      const orderitem = await orderitemModel.findOne({
        order_id: bill_no,
        product_id: value.product_id,
      });

      if (orderitem) {
        fetchArray.push({
          bill_no: bill_no,
          inv_no: value.invoice_number,
          productid: value.product_id,
          productName: value.product_name,
          quantity: value.quantity,
          ptr: orderitem.ptr,
          tentative_discount: orderitem.tentative_discount,
          tax_percentage: orderitem.tax_percentage,
          tentative_line_value: orderitem.tentative_line_value,
          quantity_type: orderitem.quantity_type,
          scheme_id: orderitem.scheme_id,
          status: value.status,
        });
      }
    }
  }

  const order = await orderModel.findOne({ order_id: bill_no });
  const invoice_bill =
    __basedir + "/assets/uploads/invoice/" + order.invoice_pdf;
  const invoice = order.invoice_pdf;
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data fetched successfully",
    data: { invoice_bill, fetchArray, invoice },
  });
});

//detele order item
exports.orderDelete = catchAsyncError(async (req, res) => {
  const query = {
    order_id: req.body.order_id,
    product_id: req.body.product_id,
  };
  const type = req.body.type;
  if (type != "" && type == constants.QUEUE) {
    query.queue = constants.QUEUE;
  }
  const data = await orderitemModel.softDelete(query);
  res.status(Response.HTTP_OK).send({
    status: true,
    message: "Data Deleted Successfully",
    data: data,
  });
});
