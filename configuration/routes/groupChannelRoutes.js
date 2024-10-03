const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const GroupChannelController = require("../controllers/ClassGroupChannelController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

// Group Channel List
router.get(
  "/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  GroupChannelController.getChannelList
);

// Group List
router.get(
  "/fetch/group",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  GroupChannelController.getGroupList
);

// Class List
router.get(
  "/fetch/class",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  GroupChannelController.getClassList
);

// Channel list inner api
router.get("/list/channel", GroupChannelController.channelList);

// Subchannel list inner api
router.get(
  "/subchannel/list/:channel_code",
  GroupChannelController.subchannelList
);

// Group list inner api
router.get(
  "/group/listby/subchannel/:subchannel_code",
  GroupChannelController.groupList
);

// Class list inner api
router.get("/class/listby/group/:group_code", GroupChannelController.classList);

module.exports = router;
