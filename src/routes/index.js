const express = require("express");
const router = express.Router();

// Import routes
const authRoutes = require("./auth");
const productRoutes = require("./products");
const authMiddleware = require("../middleware/auth");

// Register routes
router.use("/auth", authRoutes);
router.use("/products", authMiddleware, productRoutes);

module.exports = router;
