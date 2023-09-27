const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
	// TODO: Categroty
	category: {},
  price: {
    type: Number,
    required: true
  },
  inStockQuantity: {
    type: Number,
		required: true
  },
	productImageUrl: {
    type: String
  },
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;