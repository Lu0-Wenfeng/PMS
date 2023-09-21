const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
	// TODO: combine with Product
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart'
    }
  ]
});

userSchema.pre('save', async function (next) {
	// TODO
});

// TODO
userSchema.methods.comparePassword = undefined;

const User = mongoose.model('User', userSchema);

module.exports = User;