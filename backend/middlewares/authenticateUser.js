// authenticateUser.js
const jwt = require("jsonwebtoken");

exports.authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userData = {
        userId: decodedToken.userId,
        userType: decodedToken.userType,
      };
      next();
    } else {
      return res
        .status(401)
        .json({ message: "Authentication failed: No token provided." });
    }
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};
