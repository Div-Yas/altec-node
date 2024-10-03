const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const billingController = require("../controllers/BillingController");

// Get Salesman Code
router.post(
  "/salesmancode/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  billingController.getSalesmanCode
);

// Get Route Code
router.post(
  "/routecode/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  billingController.getRouteCode
);

// Get Customer Code
router.post(
  "/customercode/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  billingController.getCustomer
);

// Get Product
router.post(
  "/product/fetch",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  billingController.getProduct
);

//Get Product Info
router.post(
  "/product/info",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  billingController.getProductInfo
);

//create Order Billing
router.post(
  "/order/create",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  billingController.createOrderBilling
);

//Fetch Order Billing
router.get(
  "/order/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  billingController.fetchOrderBilling
);

//Get Order Billing info
router.get(
  "/order/info",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  billingController.getOrderBilling
);

//Get Credit Debit Ajustment List
router.get(
  "/credit/debit/get",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  billingController.getCreditDebitAdjustmentList
);

//Insert Stock Report
router.post(
  "/stock/report/insert",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  billingController.distributorStockReportInsert
);

//Insert Credit Debit Adjustment
router.post(
  "/credit/debit/adjustment/insert",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  billingController.creditDebitAdjustmentInsert
);

//get distribution Stock Report Inner Api
router.get(
  "/stock/:distributor_code",
  billingController.getDistributorStockReport
);

//get distributor branch code
router.get(
  "/branchcode/:distributor_code",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  billingController.getDistributorBranchCode
);

module.exports = router;
