const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const companyController = require("../controllers/CompanyController");

//Company Create Route
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  companyController.companyInsert
);
//Company Update Route
router.put(
  "/update/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  companyController.companyUpdate
);
//Company Fetch by Id Route
router.get(
  "/fetch/byid/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  companyController.companyFetch
);

//Company List Route
router.get(
  "/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  companyController.companyFetchAll
);

// Delete Company
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  companyController.companyDelete
);

// Inner api Company routes
router.get("/details/:company_code", companyController.fetchCompany);

//Get Purchase Invoice
router.post(
  "/purchase/invoice",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  companyController.getInvoiceDetails
);

//Get Purchase Invoice Numbers
router.post(
  "/purchase/invoiceno",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  companyController.geInvoiceNo
);

//get Purchase Invoice Information
router.post(
  "/purchase/invoice/get",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  companyController.getSingleInvoiceDetails
);
module.exports = router;
