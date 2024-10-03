const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const jcCalendarController = require("../controllers/JCCalendarController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

// JC Calendar Fetch
router.get(
  "/fetch",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  jcCalendarController.jcFetch
);

module.exports = router;
