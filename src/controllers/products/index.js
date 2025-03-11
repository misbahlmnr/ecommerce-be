const fs = require("fs");
const { ProductServices } = require("../../services");

const getAllProductsController = async (req, res) => {
  try {
    const products = await ProductServices.getAllProducts();

    return res.status(200).send({
      data: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal server error",
      details: error.message,
    });
  }
};

const getProductByIdController = async (req, res) => {
  const { id } = req.params;

  if (typeof parseInt(id) !== "number") {
    return res.status(400).send({
      message: "Invalid product id",
    });
  }

  try {
    const product = await ProductServices.getProductById(parseInt(id));

    if (!product) {
      return res.status(400).send({
        message: "Product not found",
      });
    }

    return res.send({
      data: product,
      message: "Product fetched successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal server error",
      details: error.message,
    });
  }
};

const postProductController = async (req, res) => {
  const { name, description, price } = req.body;
  const imageUrl = req.file
    ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    : null;

  if (!name || !description || !price || !imageUrl) {
    // hapus file nya jika data tidak lengkap
    if (req.file) fs.unlinkSync(req.file.path);

    return res.status(422).send({
      message: "Please provide all required fields",
    });
  }

  try {
    const product = await ProductServices.createProduct({
      name,
      description,
      price: parseFloat(price),
      imageUrl,
    });

    return res.status(201).send({
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    // hapus file nya jika ada error
    if (req.file) fs.unlinkSync(req.file.path);

    return res.status(500).send({
      message: "Internal server error",
      details: error.message,
    });
  }
};

const putProductController = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  const imageUrl = req.file
    ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    : null;

  if (typeof parseInt(id) !== "number") {
    return res.status(400).send({
      message: "Invalid product id",
    });
  }

  if (!name || !price || !description || !imageUrl) {
    return res.status(422).send({
      message: "Please provide all required fields",
    });
  }

  try {
    const product = await ProductServices.updateProduct(parseInt(id), {
      name,
      price: parseFloat(price),
      description,
      imageUrl,
    });

    if (!product) {
      return res.status(400).send({
        message: "Product not found",
      });
    }

    return res.send({
      data: product,
      message: "Product updated successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal server error",
      details: error.message,
    });
  }
};

const deleteProductController = async (req, res) => {
  const { id } = req.params;

  if (typeof parseInt(id) !== "number") {
    return res.status(400).send({
      message: "Invalid product id",
    });
  }

  try {
    const product = await ProductServices.deleteProduct(parseInt(id));

    if (!product) {
      return res.status(400).send({
        message: "Product not found",
      });
    }

    return res.send({
      data: product,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal server error",
      details: error.message,
    });
  }
};

module.exports = {
  getAllProductsController,
  getProductByIdController,
  postProductController,
  putProductController,
  deleteProductController,
};
