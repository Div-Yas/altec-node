const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const geographyValueController = require("../controllers/GeographyHierarchyLevelValueController");
const ExcelUpload = require("../utils/ExcelUpload");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

//  Geography Hierarchy Level Value Upload
router.post(
  "/upload",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ExcelUpload.single("file"),
  geographyValueController.geographyHierarchyValueUpload
);

// Geography Hierarchy Level Value Fetch
router.get(
  "/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  geographyValueController.geographyHierarchyValueFetch
);

// Geography Hierarchy Level Value Insert
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  geographyValueController.geographyHierarchyValueInsert
);

// Geography Hierarchy Level Value by Id Fetch
router.get(
  "/fetch/byid/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  geographyValueController.geographyHierarchyValueFetchById
);

// Geography Hierarchy Level Value Update
router.put(
  "/update/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  geographyValueController.geographyHierarchyValueUpdate
);

// Geography Hierarchy Level Value Delete
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  geographyValueController.geographyHierarchyValueDelete
);

module.exports = router;
