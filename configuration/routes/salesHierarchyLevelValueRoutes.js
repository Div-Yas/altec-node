const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const salesHierarchyValueController = require("../controllers/SalesHierarchyLevelValueController");
const ExcelUpload = require("../utils/ExcelUpload");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

// Sales Hierarchy Level Value Upload
router.post(
  "/upload",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ExcelUpload.single("file"),
  salesHierarchyValueController.salesHierarchyValueUpload
);

// Sales Hierarchy Level Value Fetch
router.get(
  "/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  salesHierarchyValueController.salesHierarchyLevelValueFetch
);

// Sales Hierarchy Level Value Insert
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  salesHierarchyValueController.salesHierarchyLevelValueInsert
);

// Sales Hierarchy Level Value Update
router.put(
  "/update/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  salesHierarchyValueController.salesHierarchyLevelValueUpdate
);

// Sales Hierarchy Level Value Delete
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  salesHierarchyValueController.salesHierarchyLevelValueDelete
);

// Sales Hierarchy Level Value by Id Fetch
router.get(
  "/fetch/byid/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  salesHierarchyValueController.salesHierarchyLevelValueById
);

module.exports = router;
