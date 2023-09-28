const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    // 添加了这个属性来判断是否是管理员
    type: Boolean,
    default: false,
  },
  // TODO: combine with Product
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  ],
});

// 这两个部分是老师的代码 但是我瞅着可以直接用
// 在Auth.js已经hash过了，这里不用重复hash
// userSchema.pre("save", async function (next) {
//   try {
//     if (!this.isModified("password")) {
//       return next();
//     }
//     let hashedPassword = await bcrypt.hash(this.password, 10);
//     this.password = hashedPassword;
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });

// TODO
userSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    let isMatched = await bcrypt.compare(candidatePassword, this.password);
    return isMatched;
  } catch (err) {
    return next(err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
