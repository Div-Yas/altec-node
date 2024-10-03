const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const routeController = require("../controllers/RouteController");
const ExcelUpload = require("../utils/ExcelUpload");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

// Routes upload
router.post(
  "/upload",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ExcelUpload.single("file"),
  routeController.routeUpload
);

// Create Route
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN),
  routeController.createRoute
);

// Get Route List
router.get(
  "/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  routeController.getRouteList
);

// Get Single Route
router.get(
  "/fetch/byid/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  routeController.getSingleRoute
);

// Update Route
router.put(
  "/update/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN),
  routeController.updateRoute
);

// Delete Route
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN),
  routeController.deleteRoute
);

//Inner Api
router.get("/fetch/:route_code", routeController.fetchRoute);

// Inner Api route list by role type
router.get("/list/:route_type", routeController.listRoute);

// fetch Route list by distributor code
router.get("/list/discode/:distributor_code", routeController.fetchRouteList);

//fetch Route List By Distributor Code using Admin and distributor
router.post(
  "/list/byuser",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  routeController.fetchRouteListAdmin
);
module.exports = router;
