const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const DistributorController = require("../controllers/DistributorController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

// Create Distributor
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  DistributorController.createDistributor
);

// Get Distributor List
router.get(
  "/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  DistributorController.getDistributorList
);

// Get Single Distributor
router.get(
  "/fetch/byid/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  DistributorController.getSingleDistributor
);

// Update Distributor
router.put(
  "/update/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  DistributorController.updateDistributor
);

// Delete Distributor
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  DistributorController.deleteDistributor
);

// router.get(
//   "/branch/list",
//   isAuthenticatedUser,
//   authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
//   DistributorController.getDistributors
// );

// Get distributor by salesman code
router.get(
  "/fetch/bycode/:salesman_code",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_SALESMAN),
  DistributorController.getDistributorBySalesmanCode
);

module.exports = router;
