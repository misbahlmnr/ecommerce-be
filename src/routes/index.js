const express = require("express");
const router = express.Router();

// Import routes
const authRoutes = require("./auth");
const todoRoutes = require("./todos");
const authMiddleware = require("@middleware/auth");

// Register routes
router.use("/auth", authRoutes);
router.use("/todo", authMiddleware, todoRoutes);

module.exports = router;
