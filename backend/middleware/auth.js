const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        error: "No Authentication token provided",
      });
    } //bounces user if no token found
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //verifies toek
    req.user = decoded; // adds verified user to request obj
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
