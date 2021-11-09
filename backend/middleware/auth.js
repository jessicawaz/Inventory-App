import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check token
  if (!token) {
    res.status(401).json({ message: "No token, access denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    // Add user
    req.user = decoded;
    // call next middleware
    next();
  } catch (err) {
    res.status(400).json({ message: "Token is not valid." });
  }
};

export default auth;
