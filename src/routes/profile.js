const { getProfileController } = require("../controllers/profile");
const express = require("express");
const router = express.Router();

router.get("/me", getProfileController);

module.exports = router;
