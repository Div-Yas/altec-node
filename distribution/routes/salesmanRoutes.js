const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const salesController = require("../controllers/SalesmanController");
const ExcelUpload = require("../utils/ExcelUpload");
const ImageUpload = require("../utils/SalesImageUpload");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

// salesman upoad
router.post(
  "/upload",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ExcelUpload.single("file"),
  salesController.salesmanUpload
);

// salesman distributor mapping upload
router.post(
  "/distributor/mapping/upload",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ExcelUpload.single("file"),
  salesController.salesmanDistributorMappingUpload
);

// salesman route mapping upload
router.post(
  "/route/mapping/upload",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ExcelUpload.single("file"),
  salesController.routeMappingUpload
);

// Salesman route mapping fetch
router.get(
  "/route/mapping/fetch",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  salesController.routeMappingFetch
);

// salesman jc routes mapping fetch
router.post(
  "/jc/fetch",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  salesController.salesmanJCRouteMappingFetch
);

// salesman jc routes mapping upload
router.post(
  "/jc/upload",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ExcelUpload.single("file"),
  salesController.salesmanJCRouteMappingUpload
);

// Create a new salesman
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN),
  ImageUpload.single("file"),
  salesController.createSalesman
);

// Fetch salesman
router.get(
  "/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  salesController.fetchSalesman
);

// Update a salesman
router.put(
  "/update/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN),
  ImageUpload.single("file"),
  salesController.updateSalesman
);

// Delete a salesman
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN),
  salesController.deleteSalesman
);

// fetch Salesman By Id
router.get(
  "/fetch/byid/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  salesController.fetchSalesmanById
);

//Joins fetch_salesman_route_map_list By Id
router.post(
  "/route/fetch",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  salesController.fetchSalesmanRouteMapList
);

//Get Salesman Attendance
router.post(
  "/attendance",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  salesController.salesmanGetAttendance
);

//Get Salesman MarketVist Attendance
router.get(
  "/attendance/marketvist/:sa_id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  salesController.getSalesmanMarketVisit
);

//Create Salesman Route Mapping
router.post(
  "/route/mapping/create",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  salesController.createRouteMapping
);

// fetch route mapping(inner API)
router.get("/route/mapping/fetch/:filter", salesController.fetchRouteMapping);

//Get Salesman info(inner API)
router.get("/info/fetch/:filter", salesController.fetchSalesmanInfo);

//Get Salesman info(inner API)
router.get(
  "/info/get/:salesman_code",
  salesController.fetchSalesmanInfoBySalesCode
);
module.exports = router;
