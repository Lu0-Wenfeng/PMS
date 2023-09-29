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
