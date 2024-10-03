const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const ProductController = require("../controllers/ProductController");

//fetch Product
router.get(
  "/list",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ProductController.fetchProduct
);

//create Product
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ProductController.createProduct
);

//product destroy
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ProductController.productDelete
);

// product Update
router.put(
  "/update/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ProductController.productUpdate
);

//fetch Product by id
router.get(
  "/fetch/byid/:id",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ProductController.fetchProductById
);

//fetch product(Inner api routes)
router.get("/get/:product_code", ProductController.getProduct);

//fetch all product(Inner api routes)
router.get("/fetchall", ProductController.fetchProductAll);

//fetch product by Sku type
router.post(
  "/fetch/sku",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  ProductController.fetchProductBySkuType
);

module.exports = router;
