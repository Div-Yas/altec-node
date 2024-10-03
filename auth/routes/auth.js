const express = require("express");
const authController = require("../controllers/AuthController");
const router = express.Router();

// Auth Routes
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/user/fetch/:token", authController.fetchUser);
router.post("/logout", authController.logoutUser);
router.post("/user/register", authController.userRegister);

module.exports = router;
