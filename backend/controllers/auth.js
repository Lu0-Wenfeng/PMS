const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
User = require("../models/user");
Product = require("../models/product");
Cart = require("../models/cart");

exports.signup = async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    console.log("Incoming signup request", email, password, isAdmin);

    // Check if the username already exists
    const existingUser = await User.findOne({ email });
    console.log("existing user", existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password", hashedPassword);
    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      isAdmin,
    });

    await newUser.save();
    console.log("New user", newUser);
    // Determine user type (admin or regular user)
    const userType = isAdmin ? "admin" : "regular";
    const userData = { userId: newUser._id, userType };
    req.userData = userData;
    console.log("userData", userData);
    // Generate JWT token with user type as a claim
    const token = jwt.sign(userData, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration time
    });

    res.status(201).json({
      message: "Signup successful",
      isAdmin: isAdmin,
      email: email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login Route
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User Not exist" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    // Determine user type (admin or regular user)
    const userType = user.isAdmin ? "admin" : "regular";

    const userData = { userId: user._id, userType };
    req.userData = userData;
    // Generate JWT token with user type as a claim
    const token = jwt.sign(userData, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration time
    });

    res.status(200).json({ token, isAdmin: user.isAdmin, email: user.email });
    console.log(`User ${email} signed in`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout Route (not usually needed for token-based authentication)
exports.logout = (req, res, next) => {
  // For token-based authentication, the client can simply discard the token.
  // 在前端 这里只需要丢弃令牌 例如：
  // localStorage.removeItem('token');
  res.status(200).json({ message: "Logout successful" });
};

// Update the password
exports.updatePassword = async (req, res, next) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
