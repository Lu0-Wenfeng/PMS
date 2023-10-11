const express = require("express");
const router = express.Router();
const {
  signup: signUp,
  signin: signIn,
  updatePassword,
} = require("../controllers/auth");
const {
  createProduct,
  searchProduct,
  getAllProducts,
  productDeatails,
  editProduct,
  deleteProduct,
} = require("../controllers/productControllers");
const { authenticateUser } = require("../middlewares/authenticateUser");
const { syncCartWithServer } = require("../controllers/cartControllers");

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
router.delete("/delete-product/:id", authenticateUser, deleteProduct);
router.get("/search-product/:query", searchProduct);

// Cart Flow
router.post("/sync-cart", authenticateUser, syncCartWithServer);
// router.get("/cart", authenticateUser, myCart);
// router.post("/cart/add/:productId", authenticateUser, addToCart);
// router.delete(
//   "/cart/delete/:productId",
//   authenticateUser,
//   deleteProductfromCart
// );
// router.put(
//   "/cart/update-quantity/:productId/:quantity",
//   authenticateUser,
//   updateCartItemQuantity
// );

// Error Handling
router.get("/error", () => errorHandler);

module.exports = router;
