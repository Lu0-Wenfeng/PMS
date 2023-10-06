const Product = require("../models/product");
const User = require('../models/user')
const Cart = require("../models/cart");

exports.myCart = async (req, res) => {
    try {
        const userId  = req.userData.userId;
        const cart = await Cart.findOne({ user: userId }).populate('products.product');

        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }

        const productsInCart = cart.products.map(item => ({
            productId: item.product._id,
            productName: item.product.name,
            productPrice: item.product.price,
            productImageUrl: item.product.productImageUrl,
            productQuantity: item.quantity,
            // Add other product details as needed
          }));

          res.status(200).json(productsInCart);

        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
};

exports.addToCart = async (req, res) => {
    const { productId } = req.params;
    const userId  = req.userData.userId;
    const { quantity } = req.body;

    try{
        // check valid input
    if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({ message: 'Invalid quantity' });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the product
    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    if (quantity > product.inStockQuantity) {
        return res.status(400).json({ message: 'Not enough stock' });
    }

    // Check if the product is already in the cart, if yes, update the quantity
    const existingProductIndex = cart.products.findIndex(item => item.product.equals(productId));

    if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += quantity;
    } else {
        // Add the new product to the cart
        cart.products.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(200).json({ message: 'Product added to cart successfully' });

    } catch (error) {
        console.error('Error in addToCart function:', error);
        res.status(500).json({ message: 'Server error' });
    }

};

exports.deleteProductfromCart = async (req,res) => {
    const { productId } = req.params;
    const userId  = req.userData.userId;
    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Check if the product is in the cart
        const productIndex = cart.products.findIndex(item => item.product.equals(productId));

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in the cart' });
        }

        // Remove the product from the cart
        cart.products.splice(productIndex, 1);

        await cart.save();

        res.status(200).json({ message: 'Product removed from cart successfully' });

    } catch (error) {
        console.error('Error in deleteFromCart function:', error);
        res.status(500).json({ message: 'Server error' });  
    }
};

exports.updateCartItemQuantity = async (req,res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const userId  = req.userData.userId;

        // Check if the quantity is a positive integer
        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

        // Find the user's cart
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Check if the product is in the cart
        const productIndex = cart.products.findIndex(item => item.product.equals(productId));

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in the cart' });
        }

        // Find the product to check if the requested quantity is greater than the available stock
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the requested quantity is greater than the available stock
        if (quantity > product.inStockQuantity) {
            return res.status(400).json({ message: 'Not enough stock available for the requested quantity' });
        }

        // Update the quantity of the product in the cart
        cart.products[productIndex].quantity = quantity;

        await cart.save();

        res.status(200).json({ message: 'Cart item quantity updated successfully' });
    } catch (error) {
        console.error('Error in updateCartItemQuantity function:', error);
        res.status(500).json({ message: 'Server error' });
    }
}