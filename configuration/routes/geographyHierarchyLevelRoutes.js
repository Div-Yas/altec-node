const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const geographyHierarchyController = require("../controllers/GeographyHierarchyLevelController");
const ExcelUpload = require("../utils/ExcelUpload");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

// Geography Hierarchy Level Upload
router.post(
  "/upload",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ExcelUpload.single("file"),
  geographyHierarchyController.geographyHierarchyUpload
);

// Geography Hierarchy Level Fetch
router.get(
  "/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  geographyHierarchyController.geographyHierarchyFetch
);

// Geography Hierarchy Level Insert
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  geographyHierarchyController.geographyHierarchyInsert
);

// Geography Hierarchy Level by Id Fetch
router.get(
  "/fetch/byid/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  geographyHierarchyController.geographyHierarchyFetchById
);

// Geography Hierarchy Level Update
router.put(
  "/update/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  geographyHierarchyController.geographyHierarchyUpdate
);

// Geography Hierarchy Level Delete
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  geographyHierarchyController.geographyHierarchyDelete
);

module.exports = router;
