const Product = require("../models/product");

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
      productImageUrl,
    });
    await newProduct.save();
    res.status(201).json({
      message: "Backend Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.productDeatails = async (req, res) => {
  try {
    // product name should be passed in
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log("product", product);
    if (!product) {
      return res.status(404).json({ message: "Backend Product not found" });
    }
    const productDetails = {
      name: product.name,
      category: product.category,
      inStockQuantity: product.inStockQuantity,
      price: product.price,
      productImageUrl: product.productImageUrl,
      description: product.description,
    };
    console.log("Backend Fetching product details: ", productDetails);
    res.status(200).json(productDetails);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 当数据量增大时，应该按页码获取商品信息，目前先这样吧
exports.getAllProducts = async (req, res) => {
  try {
    const userData = req.userData;
    const allProducts = await Product.find().sort({ createdAt: -1 });
    console.log("userData", userData);
    res.status(200).json({
      userData,
      allProducts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = req.body;
    console.log("received edit product request", req.body);
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Backend Product not found" });
    }

    // Update product details
    product.name = updatedProduct.name;
    product.description = updatedProduct.description;
    product.category = updatedProduct.category;
    product.price = updatedProduct.price;
    product.inStockQuantity = updatedProduct.inStockQuantity;
    product.productImageUrl = updatedProduct.productImageUrl;

    await product.save();
    console.log("Product after update", product);

    res.status(200).json({
      message: "Backend Product updated successfully",
      id: product.id,
      updatedProduct: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Backend Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
