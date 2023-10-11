const Product = require("../models/product");
const User = require("../models/user");
const Cart = require("../models/cart");

exports.syncCartWithServer = async (req, res) => {
  const inCartItems = req.body;
  const userId = req.userData.userId;
  console.log("Saving cart items: ", inCartItems, "for userId: ", userId);

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [],
      });
    }
    const cartPromises = inCartItems.map(async (item) => {
      const product = await Product.findById(item.productId);

      if (!product) throw new Error("Product not found");

      if (item.quantity > product.inStockQuantity)
        throw new Error("Not enough stock");

      const cartItemIndex = cart.products.findIndex(
        (prod) => prod.product.toString() === item.productId
      );
      if (cartItemIndex >= 0) {
        cart.products[cartItemIndex].quantity = item.quantity;
      } else {
        cart.products.push({
          product: item.productId,
          quantity: item.quantity,
        });
      }
    });
    await Promise.all(cartPromises);
    await cart.save();
    res.status(200).json({ message: "Cart saved", syncedCart: cart.products });
  } catch (error) {
    console.log("have an error", error);
    if (error.message === "Product not found") {
      return res.status(400).json({ message: "Product not found" });
    } else if (error.message === "Not enough stock") {
      return res.status(400).json({ message: "Not enough stock" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
};
