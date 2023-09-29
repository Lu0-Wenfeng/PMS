const express = require("express");
const router = express.Router();
const {
  signup: signUp,
  signin: signIn,
  updatePassword,
} = require("../controllers/auth");
const { createProduct } = require("../controllers/productControllers");

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
// router.post('/logout', logout)
router.post("/update-pwd", updatePassword);
router.post("/create-product", createProduct);

module.exports = router;
