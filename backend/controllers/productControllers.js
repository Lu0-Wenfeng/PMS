Product = require("../models/product");

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      inStockQuantity,
      productImageUrl,
    } = req.body;

    const existingProduct = await Product.findOne({ name: name });
    if (existingProduct) {
      return res.status(400).json({
        message: "Product already exists",
      });
    }
    const newProduct = new Product({
      name: name,
      description: description,
      category: category,
      price: price,
      inStockQuantity: inStockQuantity,
      productImageUrl: productImageUrl,
    });
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.productDeatails = async (req, res) => {
  try {
    // product name should be passed in
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const productDetails = {
      name: product.name,
      category: product.category,
      inStockQuantity: product.inStockQuantity,
    };

    res.status(200).json(productDetails);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};