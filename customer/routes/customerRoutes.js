const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const ExcelUpload = require("../utils/ExcelUpload");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const customerController = require("../controllers/CustomerController");
const customerUpload = require("../utils/CustomerImageUpload");

// Create Customer with Image Upload using Multer
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  customerUpload.fields([
    { name: "ca_attach_parent" },
    { name: "image_name", maxCount: 10 },
  ]),
  customerController.createCustomer
);

// Fetch Customer by status
router.get(
  "/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  customerController.fetchCustomer
);

// Delete Customer
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  customerController.deleteCustomer
);

// Update Customer status
router.post(
  "/update/status",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  customerController.updateCustomerStatus
);

// customer route upload
router.post(
  "/route/upload",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ExcelUpload.single("file"),
  customerController.customerRouteUpload
);

// customer route fetch
router.get(
  "/route/fetch",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  customerController.customerRouteFetch
);

// Customer Upload - Import is pending
router.post(
  "/upload",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ExcelUpload.single("file"),
  customerController.customerUpload
);

// Customer Fetch by id
router.get(
  "/fetch/byid/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  customerController.fetchCustomerById
);

// Customer Fetch
router.get(
  "/general/get/:customer_code",
  customerController.customerGeneralsFetch
);

// Customer coverage Fetch
router.get("/coverage/get/:filter", customerController.customerCoverageFetch);

// Fetch Route list By route_type
router.post(
  "/route/fetch",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  customerController.routeList
);

// Fetch Channel List
router.get(
  "/channel/fetch",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  customerController.channelList
);

// Fetch Subchannel List By channel code
router.get(
  "/subchannel/fetch/:channel_code",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  customerController.subchannelList
);

// Fetch Group list by subchannel code
router.get(
  "/group/fetch/:subchannel_code",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  customerController.groupList
);

// Fetch Class list by group code
router.get(
  "/class/fetch/:group_code",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  customerController.classList
);

module.exports = router;
