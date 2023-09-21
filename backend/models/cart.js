const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    // 购物车中的产品
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // 参考产品模式
          required: true
        },
        quantity: {
          type: Number,
          default: 1 // 默认数量为1，可以根据需要修改
        }
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // 参考用户模式
      required: true
    }
  },
  {
    timestamps: true // 添加时间戳字段
  }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;