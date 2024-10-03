const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const SalesReturnController = require("../controllers/SalesretunController");

//fetch sales return
router.post(
  "/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  SalesReturnController.fetchSalesReturn
);

//fetch sales return item by sales return id
router.get(
  "/fetch/item/:sales_return_id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  SalesReturnController.fetchSalesReturnItem
);

//fetch sales return item by sales return id
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  SalesReturnController.salesReturnCreate
);

//fetch sales return item by sales return id
router.post(
  "/item/create",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  SalesReturnController.salesReturnItemcreate
);

module.exports = router;
