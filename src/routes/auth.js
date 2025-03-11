const express = require("express");
const router = express.Router();

const { loginController, registerController } = require("../controllers/auth");

router.post("/login", loginController);
router.post("/register", registerController);

module.exports = router;
