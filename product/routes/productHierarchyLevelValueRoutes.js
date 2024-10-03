const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const ExcelUpload = require("../utils/excelUpload");
const productHierarchyLevelValueController = require("../controllers/ProductHierarchyLevelValueController");

//fetch ProductHierarchyLevelvalue
router.get(
  "/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  productHierarchyLevelValueController.fetchProductHierarchyLevelValue
);

//ProductHierarchyLevelvalue destroy
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  productHierarchyLevelValueController.ProductHierarchyLevelValueDelete
);

// ProductHierarchyLevelvalue update
router.put(
  "/update/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  productHierarchyLevelValueController.ProductHierarchyLevelValueUpdate
);

//fetch ProductHierarchyLevelvalue by id
router.get(
  "/fetch/byid/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  productHierarchyLevelValueController.fetchProductHierarchyLevelValueById
);

//create ProductHierarchyLevel value
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  productHierarchyLevelValueController.createProductHierarchyLevelValue
);

// ProductHierarchyLevel value upload
router.post(
  "/upload",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ExcelUpload.single("file"),
  productHierarchyLevelValueController.productHierarchyLevelValueUpload
);

// Sample Excel for ProductHierarchyLevel value
router.get(
  "/sample",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  productHierarchyLevelValueController.sampleExcelDownload
);

module.exports = router;
