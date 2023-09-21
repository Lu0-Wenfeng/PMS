const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI, {
	// keepAlive: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
});

module.exports.User = require('./user');
module.exports.Product = require('./product');
module.exports.cart = require('./cart');