"use strict";
const axios = require("axios");
const constants = require("../config/constants");

class ApiHandler {
  getUserInformation(token) {
    return axios(`${constants.AUTH_BACKEND_URL}/api/auth/user/fetch/${token}`);
  }
  async getCompanyList(filter) {
    return axios(
      `${constants.COMPANY_BACKEND_URL}/api/company/details/${filter}`
    );
  }
}

module.exports = new ApiHandler();
