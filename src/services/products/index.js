const prisma = require("../../db");

class ProductServices {
  static getAllProducts = async () => {
    try {
      const products = await prisma.product.findMany();
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getProductById = async (id) => {
    try {
      const product = await prisma.product.findUnique({
        where: {
          id,
        },
      });
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static createProduct = async (data) => {
    try {
      const product = await prisma.product.create({
        data: {
          ...data,
        },
      });
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static updateProduct = async (id, data) => {
    try {
      const product = await prisma.product.update({
        where: {
          id,
        },
        data: {
          ...data,
        },
      });
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static deleteProduct = async (id) => {
    try {
      const product = await prisma.product.delete({
        where: {
          id,
        },
      });
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = ProductServices;
