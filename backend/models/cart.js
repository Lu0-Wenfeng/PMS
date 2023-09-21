const mongoose = require('mongoose');
const User = require('./user');

const cartSchema = new mongoose.Schema(
  {
    // to be filled in later
		// ...

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },

);

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;