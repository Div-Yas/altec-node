const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const stockController = require("../controllers/StockController");

//current distributor Stock
router.post(
  "/distributor/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  stockController.getStockList
);
module.exports = router;
