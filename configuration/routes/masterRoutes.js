const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const MasterController = require("../controllers/MasterController");
const ExcelUpload = require("../utils/ExcelUpload");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

// deliveryboy routes upload
router.post(
  "/deliveryboy/route/upload",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ExcelUpload.single("file"),
  MasterController.deliveryboyRouteUpload
);

// deliveryboy routes fetch
router.get(
  "/deliveryboy/route/fetch",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  MasterController.deliveryboyRouteFetch
);

// Opening Balance Upload
router.post(
  "/openingbalance/upload",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ExcelUpload.single("file"),
  MasterController.openingBalanceUpload
);

// Opening Balance Fetch
router.get(
  "/openingbalance/fetch",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  MasterController.openingBalanceFetch
);

// Deliveryboy upload
router.post(
  "/deliveryboy/upload",
  isAuthenticatedUser,
  ExcelUpload.single("file"),
  MasterController.deliveryboyUpload
);

// Deliveryboy fetch
router.get(
  "/deliveryboy/fetch",
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  MasterController.deliveryboyFetch
);

// Sample Excel Download
router.post(
  "/sample/excel/download",
  isAuthenticatedUser,
  MasterController.sampleExcelDownload
);

module.exports = router;
