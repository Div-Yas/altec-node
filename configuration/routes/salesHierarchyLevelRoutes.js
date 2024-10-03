const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const salesHierarchyController = require("../controllers/SalesHierarchyLevelController");
const ExcelUpload = require("../utils/ExcelUpload");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

// Sales Hierarchy Level Upload
router.post(
  "/upload",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ExcelUpload.single("file"),
  salesHierarchyController.uploadSalesHiearchyLevel
);

// Sales Hierarchy Level Fetch
router.get(
  "/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  salesHierarchyController.salesHiearchyFetch
);

// Sales Hierarchy Level Insert
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  salesHierarchyController.salesHiearchyInsert
);

// Sales Hierarchy Level Update
router.put(
  "/update/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  salesHierarchyController.salesHiearchyUpdate
);

// Sales Hierarchy Level Delete
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  salesHierarchyController.salesHiearchyLevelDelete
);

// Sales Hierarchy Level by Id Fetch
router.get(
  "/fetch/byid/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  salesHierarchyController.salesHiearchyFetchById
);

module.exports = router;
