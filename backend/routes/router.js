const express = require("express");
const router = express.Router();
const {
  signup: signUp,
  signin: signIn,
  updatePassword,
} = require("../controllers/auth");
const { createProduct, getAllProducts, productDeatails, editProduct, deleteProduct } = require("../controllers/productControllers");
const {authenticateUser} = require('../middlewares/authenticateUser');
const {myCart, addToCart, deleteProduct, updateCartItemQuantity } = requrie('../controllers/cartControllers')

// Auth Flow
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
// router.post('/logout', logout)
router.post("/update-pwd", updatePassword);

// Product Flow
router.post("/create-product", authenticateUser, createProduct);
router.get("/all-products", authenticateUser, getAllProducts);
router.get("/all-products/:id", productDeatails);
router.put("/edit-product/:id", authenticateUser, editProduct);
router.delete('./delete-product/:id', authenticateUser, deleteProduct);

// Cart Flow
router.get("./cart", authenticateUser, myCart);
router.post("./all-products/add-product/:productId", authenticateUser, addToCart)
router.delete('./cart/delete/:userId', authenticateUser, deleteProduct);
router.put('./cart/update-quantity/:productId', authenticateUser, updateCartItemQuantity )

// Error Handling
router.get("/error", () => errorHandler);

module.exports = router;
