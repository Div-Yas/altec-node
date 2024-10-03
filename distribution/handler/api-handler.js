"use strict";
const axios = require("axios");
const constants = require("../config/constants");

class ApiHandler {
  getUserInformation(token) {
    return axios(`${constants.AUTH_BACKEND_URL}/api/auth/user/fetch/${token}`);
  }
  async getRouteInformation(route_code) {
    return axios(
      `${constants.DISTRIBUTION_BACKEND_URL}/api/route/fetch/${route_code}`
    );
  }
  async getSalesmanInformationBySalescode(salesman_code) {
    return axios(
      `${constants.DISTRIBUTION_BACKEND_URL}/api/salesman/info/get/${salesman_code}`
    );
  }

  async getCompanyInfo(company_code) {
    return axios(
      `${constants.COMPANY_BACKEND_URL}/api/company/details/${company_code}`
    );
  }

  async getTownInfo(town_code) {
    return axios(
      `${constants.COMMON_BACKEND_URL}/api/common/town/fetch/${town_code}`
    );
  }

  async getGstStateMastersInfo(gst_state_name) {
    return axios(
      `${constants.COMMON_BACKEND_URL}/api/common/gststatemaster/fetch/${gst_state_name}`
    );
  }
}

module.exports = new ApiHandler();
