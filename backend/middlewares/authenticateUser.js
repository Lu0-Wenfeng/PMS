// authenticateUser.js
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.token ? req.headers.token.split(' ')[1] : null;
    console.log(token);
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decodedToken);
      req.userData = { userId: decodedToken.userId, userType: decodedToken.userType };
      } else {
       req.userData = { userId: null, userType: 'regular' }; // Assume a regular user for unauthenticated requests
      }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};



