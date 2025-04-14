const Product = require("../models/productModel");
const { sendResponse, getPostData } = require("../utils");

/**
 * @desc Get all products
 * @route GET /api/products
 */
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    sendResponse(res, 200, products);
  } catch (error) {
    sendResponse(res, 500, { message: "Internal server error" });
  }
};

/**
 * @desc Get a product by ID
 * @route GET /api/products/:id
 */
const getProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      sendResponse(res, 404, { message: "Product Not Found." });
    } else {
      sendResponse(res, 200, product);
    }
  } catch (error) {
    sendResponse(res, 500, { message: "Internal server error" });
  }
};

/**
 * @desc Create a new product
 * @route POST /api/products
 */
const createProduct = async (req, res) => {
  try {
    const data = await getPostData(req);
    const product = await Product.create(JSON.parse(data));

    sendResponse(res, 201, product);
  } catch (error) {
    sendResponse(res, 500, { message: "Internal server error" });
  }
};

/**
 * @desc Update a product by ID
 * @route PUT /api/products/:id
 */
const updateProduct = async (req, res, id) => {
  try {
    const data = await getPostData(req);
    const product = await Product.update(id, JSON.parse(data));

    sendResponse(res, 200, product);
  } catch (error) {
    sendResponse(res, 500, { message: "Internal server error" });
  }
};

/**
 * @desc Delete a product by ID
 * @route DELETE /api/products/:id
 */
const deleteProduct = async (req, res, id) => {
  try {
    await Product.remove(id);
    sendResponse(res, 200, { message: "Product deleted successfully!" });
  } catch (error) {
    sendResponse(500, { message: "Internal server error" });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
