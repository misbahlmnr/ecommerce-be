const express = require("express");
const router = express.Router();

const { getProfileController } = require("@controllers/profile");

router.get("/me", getProfileController);

module.exports = router;
