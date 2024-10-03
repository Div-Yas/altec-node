const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const SupplierController = require("../controllers/SupplierController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

// Create supplier
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  SupplierController.createSupplier
);

// Get all supplier
router.get(
  "/fetch/join",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  SupplierController.getAllSupplier
);

// Get supplier by ID
router.get(
  "/fetch/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  SupplierController.getSupplierById
);

// Update supplier
router.put(
  "/update/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  SupplierController.updateSupplier
);

// Delete supplier
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  SupplierController.deleteSupplier
);

// Get supplier name and ID
router.get(
  "/fetch",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  SupplierController.getSupplierNameAndId
);

module.exports = router;
