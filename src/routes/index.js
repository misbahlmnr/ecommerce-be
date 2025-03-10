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

router.get("/", (req, res) => {
  res.send("Ecommerce API Products ready to use");
});

router.get("/products", getAllProductsController);

router.get("/products/:id", getProductByIdController);

router.post("/products", upload.single("image"), postProductController);

router.put("/products/:id", putProductController);

router.delete("/products/:id", deleteProductController);

module.exports = router;
