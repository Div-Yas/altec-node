"use strict";
const axios = require("axios");
const constants = require("../config/constants");

class ApiHandler {
  async getUserInformation(token) {
    return axios(`${constants.AUTH_BACKEND_URL}/api/auth/user/fetch/${token}`);
  }
  async getCompanyInformation(company_code) {
    return axios(
      `${constants.COMPANY_BACKEND_URL}/api/company/details/${company_code}`
    );
  }
}

module.exports = new ApiHandler();
