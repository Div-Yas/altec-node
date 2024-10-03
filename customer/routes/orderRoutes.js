const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const orderController = require("../controllers/OrderController");

// create Order
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  orderController.createOrder
);

// fecth fresh Order
router.post(
  "/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  orderController.fetchFreshOrder
);

// fetch order item
router.post(
  "/item/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  orderController.fetchOrderItem
);

// fecth date and time
router.get(
  "/datetime",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  orderController.fetchDateTime
);

// fecth salesman information
router.post(
  "/salesman/info/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  orderController.fetchSalesmanInfo
);

//fetch queue information
router.post(
  "/queue/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  orderController.fetchQueueInformation
);

//fetch queue item information
router.post(
  "/queue/item/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  orderController.fetchQueueItem
);

//status updated
router.post(
  "/status/update",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  orderController.statusUpdate
);

//fetch product
router.post(
  "/product/fetch",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  orderController.fetchProduct
);

//Approve Product Status
router.post(
  "/approved/product/update",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  orderController.approvedOrderProduct
);

//Declined Product Status
router.post(
  "/declined/product/update",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  orderController.declinePendingOrders
);

//quantiy save
router.post(
  "/quantity/update",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  orderController.updateOrderItem
);

//approved fetch
router.post(
  "/approved/fetch",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  orderController.approvedOrderList
);

//delete order item
router.post(
  "/item/delete",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  orderController.orderDelete
);
module.exports = router;
