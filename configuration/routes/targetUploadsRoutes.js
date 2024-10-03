const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const targetController = require("../controllers/TargetUploadController");
const ExcelUpload = require("../utils/ExcelUpload");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

// Salesman
router.post(
  "/upload",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ExcelUpload.single("file"),
  targetController.uploadTarget
);

module.exports = router;
