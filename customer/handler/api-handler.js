"use strict";
const axios = require("axios");
const constants = require("../config/constants");

class ApiHandler {
  getUserInformation(token) {
    return axios(`${constants.AUTH_BACKEND_URL}/api/auth/user/fetch/${token}`);
  }
  async getRouteMappingInformation(filter) {
    return axios(
      `${constants.DISTRIBUTION_BACKEND_URL}/api/salesman/route/mapping/fetch/${filter}`
    );
  }
  async getRouteInformation(route_code) {
    return axios(
      `${constants.DISTRIBUTION_BACKEND_URL}/api/route/fetch/${route_code}`
    );
  }
  async getSalesmanInformation(filter) {
    return axios(
      `${constants.DISTRIBUTION_BACKEND_URL}/api/salesman/info/fetch/${filter}`
    );
  }
  async getProductInformation(product_code) {
    return axios(
      `${constants.PRODUCT_BACKEND_URL}/api/product/get/${product_code}`
    );
  }
  async getProductAll() {
    return axios(`${constants.PRODUCT_BACKEND_URL}/api/product/fetchall`);
  }
  async getSalesmanInformationBySalescode(salesman_code) {
    return axios(
      `${constants.DISTRIBUTION_BACKEND_URL}/api/salesman/info/get/${salesman_code}`
    );
  }
  async getCustomerGenerals(customen_code) {
    return axios(
      `${constants.CUSTOMER_BACKEND_URL}/api/customer/general/get/${customen_code}`
    );
  }
  async getCustomerCoverageInformation(filter) {
    return axios(
      `${constants.CUSTOMER_BACKEND_URL}/api/customer/coverage/get/${filter}`
    );
  }
  //get route list by route type
  async getRouteList(route_type) {
    return axios(
      `${constants.DISTRIBUTION_BACKEND_URL}/api/route/list/${route_type}`
    );
  }
  //get channel list
  async getChannelList() {
    return axios(
      `${constants.CONFIGURATION_BACKEND_URL}/api/group/channel/list/channel`
    );
  }
  //get subchannel list by channel code
  async getSubchannelList(channel_code) {
    return axios(
      `${constants.CONFIGURATION_BACKEND_URL}/api/group/channel/subchannel/list/${channel_code}`
    );
  }
  //get group list by subchannel code
  async getGroupList(subchannel_code) {
    return axios(
      `${constants.CONFIGURATION_BACKEND_URL}/api/group/channel/group/listby/subchannel/${subchannel_code}`
    );
  }
  //get class list by group code
  async getClassList(group_code) {
    return axios(
      `${constants.CONFIGURATION_BACKEND_URL}/api/group/channel/class/listby/group/${group_code}`
    );
  }

  //get sap by distributor code
  async getSapInformation(distributor_code) {
    return axios(
      `${constants.SAP_BACKEND_URL}/api/sap/invoice/fetch/${distributor_code}`
    );
  }
  async getSapApprovedInformation(filter) {
    return axios(
      `${constants.SAP_BACKEND_URL}/api/sap/approved/fetch/${filter}`
    );
  }
  async getSapPurchaseInformation(filter) {
    return axios(
      `${constants.SAP_BACKEND_URL}/api/sap/approved/product/fetch/${filter}`
    );
  }
  async getApprovedCount() {
    return axios(`${constants.SAP_BACKEND_URL}/api/sap/approved/count/fetch`);
  }
  async getSapApprovedProductInformation(bill_no) {
    return axios(
      `${constants.SAP_BACKEND_URL}/api/sap/approved/product/bybillno/fetch/${bill_no}`
    );
  }
}

module.exports = new ApiHandler();
