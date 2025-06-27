const jwt = require("jsonwebtoken");
const formatResponseAPI = require("../utils");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res.status(401).send(formatResponseAPI.error("Unauthorized"));

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send(formatResponseAPI.error("Invalid token", err));
  }
};

module.exports = authMiddleware;
