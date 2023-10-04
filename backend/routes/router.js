const express = require("express");
const router = express.Router();
const {
  signup: signUp,
  signin: signIn,
  updatePassword,
} = require("../controllers/auth");
const { createProduct, getAllProducts, productDeatails } = require("../controllers/productControllers");


// Auth Flow
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
// router.post('/logout', logout)
router.post("/update-pwd", updatePassword);

// Product Flow
router.post("/create-product", createProduct);
router.get("/all-products", getAllProducts);
router.get("/all-products/:id", productDeatails);

// Error Handling
router.get("/error", () => errorHandler);

module.exports = router;
