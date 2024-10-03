const express = require("express");
const router = express.Router();
const constants = require("../config/constants");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const sapController = require("../controllers/SAPController");

//get purchase invoice inner API
router.get("/invoice/list/:distributor_code", sapController.getPurchaseInvoice);
//get purchase invoice no inner API
router.get("/invoiceno/:distributor_code", sapController.getPurchaseInvoiceNo);
//get purchase invoice by distribution code inner API
router.get("/invoice/fetch/:distributor_code", sapController.getSapPurchase);
//get approved Product by product id inner API
router.get("/approved/fetch/:filter", sapController.getSapApproved);
//get approved Product by filter inner API
router.get(
  "/approved/product/fetch/:filter",
  sapController.getSapPurchaseInvoice
);
//get Approved Product count inner API
router.get("/approved/count/fetch", sapController.getSapApprovedCount);
//create Approved Product
router.post("/approved/create", sapController.createApprovedProduct);
//fetch approved product by bill number inner API
router.get(
  "/approved/product/bybillno/fetch/:bill_no",
  sapController.ApprovedProductByBillno
);
//get purchase invoice no inner API
router.get("/invoice/:filter", sapController.getInvoice);

//getch product by product code
router.get("/product/fetch/:product_code", sapController.getProductData);

//Purchase Invoice update
router.get(
  "/purchase/invoice/:invoice_number",
  isAuthenticatedUser,
  authorizeRoles(constants.ROLE_ADMIN, constants.ROLE_DISTRIBUTOR),
  sapController.goodsResciptSubmit
);

module.exports = router;
