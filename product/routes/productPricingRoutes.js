const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const ExcelUpload = require("../utils/excelUpload");
const productPricingController = require("../controllers/ProductPricingController");

//product Pricing excel upload
router.post(
  "/upload",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ExcelUpload.single("file"),
  productPricingController.productPricingUpload
);

//sapmle download format excel
router.get(
  "/sample",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  productPricingController.sampleExcelDownload
);

module.exports = router;
