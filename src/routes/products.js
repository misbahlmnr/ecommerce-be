const express = require("express");
const {
  getAllProductsController,
  getProductByIdController,
  postProductController,
  putProductController,
  deleteProductController,
} = require("../controllers/products");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", getAllProductsController);

router.get("/:id", getProductByIdController);

router.post("/", upload.single("image"), postProductController);

router.put("/:id", putProductController);

router.delete("/:id", deleteProductController);

module.exports = router;
