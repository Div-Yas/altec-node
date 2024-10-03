"use strict";
const axios = require("axios");
const constants = require("../config/constants");
class ApiHandler {
  getUserInformation(token) {
    return axios(`${constants.AUTH_BACKEND_URL}/api/auth/user/fetch/${token}`);
  }
  async getInvoiceList(distributor_code) {
    return axios(
      `${constants.SAP_BACKEND_URL}/api/sap/invoice/list/${distributor_code}`
    );
  }
  async getInvoiceNos(distributor_code) {
    return axios(
      `${constants.SAP_BACKEND_URL}/api/sap/invoiceno/${distributor_code}`
    );
  }
  async getSingleInvoiceInfo(filter) {
    return axios(
      `${constants.SAP_BACKEND_URL}/api/sap/invoice/${filter}`
    );
  }
  async getDistributorStock(distributor_code) {
    return axios(
      `${constants.CUSTOMER_BACKEND_URL}/api/billing/stock/${distributor_code}`
    );
  }
  async getSapProductInfo(product_code) {
    return axios(
      `${constants.SAP_BACKEND_URL}/api/sap/product/fetch/${product_code}`
    );
  }
}

module.exports = new ApiHandler();
