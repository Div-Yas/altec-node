const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const productHierarchyLevelController = require("../controllers/ProductHierarchyLevelController");

//fetch ProductHierarchyLevel
router.get(
  "/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  productHierarchyLevelController.fetchProductHierarchyLevel
);

//create ProductHierarchyLevel
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  productHierarchyLevelController.createProductHierarchyLevel
);

//ProductHierarchyLevel destroy
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  productHierarchyLevelController.ProductHierarchyLevelDelete
);

// ProductHierarchyLevel update
router.put(
  "/update/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  productHierarchyLevelController.ProductHierarchyLevelUpdate
);

//fetch ProductHierarchyLevel by id
router.get(
  "/fetch/byid/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  productHierarchyLevelController.fetchProductHierarchyLevelById
);

//fetch hierarchy level value by id
router.post(
  "/fetch/hierarchy/level/value",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  productHierarchyLevelController.fetchHierarchyReportingLevel
);
module.exports = router;
