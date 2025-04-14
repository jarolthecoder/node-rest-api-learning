require("dotenv").config();

const http = require("node:http");
const { productRoutes } = require("./routes/productsRoutes");

const server = http.createServer((req, res) => {
  // API Routes
  productRoutes(req, res);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
