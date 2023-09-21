const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Whether we should get a secret key ('your_secret_key_here') 
// for JWT token signing.
exports.signup =  async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        username,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Login Route
  exports.signin = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Determine user type (admin or regular user)
      const userType = user.isAdmin ? 'admin' : 'regular';
  
      // Generate JWT token with user type as a claim
      const token = jwt.sign({ userId: user._id, userType }, 'your_secret_key_here', {
        expiresIn: '1h', // Token expiration time
      });
  
      res.status(200).json({ token, userType });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  // Logout Route (not usually needed for token-based authentication)
exports.logout =  (req, res) => {
    // You can implement logout logic here if necessary
    // For token-based authentication, the client can simply discard the token.
    res.status(200).json({ message: 'Logout successful' });
  };

  // Update the password
exports.updatePassword = async (req, res) => {
    try {
      const { username, currentPassword, newPassword } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid current password' });
      }
  
      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password
      user.password = hashedNewPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };