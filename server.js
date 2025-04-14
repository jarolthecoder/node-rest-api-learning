require("dotenv").config();

const http = require("node:http");
const { productsRoutes } = require("./routes/productsRoutes");

const server = http.createServer((req, res) => {
  // API Routes
  productsRoutes(req, res);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
