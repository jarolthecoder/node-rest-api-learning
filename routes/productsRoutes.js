const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");
const { sendResponse } = require("../utils");

// Handles the routing for product-related API endpoints.
const productsRoutes = (req, res) => {
  const url = req.url;
  const method = req.method;
  const apiRegex = /\/api\/products\/([0-9]+)/; // Regex to match /api/products/:id

  if (url === "/api/products" && method === "GET") {
    getProducts(req, res);
  } else if (url.match(apiRegex) && method === "GET") {
    const productId = url.split("/")[3]; // Extract the product ID from the URL (e.g., /api/products/1)
    getProduct(req, res, productId);
  } else if (url === "/api/products" && method === "POST") {
    createProduct(req, res);
  } else if (url.match(apiRegex) && method === "PUT") {
    const productId = url.split("/")[3];
    updateProduct(req, res, productId);
  } else if (url.match(apiRegex) && method === "DELETE") {
    const productId = url.split("/")[3];
    deleteProduct(req, res, productId);
  } else {
    sendResponse(res, 404, { message: "Endpoint Not Found!" });
  }
};

module.exports = {
  productsRoutes,
};
