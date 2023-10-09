const jwt = require("jsonwebtoken");

exports.authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      // Directly set as a guest if there's no token
      req.userData = { userId: null, userType: "regular" };
      next();
      return; // important: exit the function here
    }

    // If there's a token, try to verify it
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = {
      userId: decodedToken.userId,
      userType: decodedToken.userType,
    };
    next();
  } catch (error) {
    // Log errors other than jwt verification errors
    if (!(error instanceof jwt.JsonWebTokenError)) {
      console.log(`Got error: ${error}`);
    }

    // Assume a regular user for invalid or missing tokens
    req.userData = { userId: null, userType: "regular" };
    next();
  }
};
