const path = require("node:path");
const products = require("../data/products.json");
const { writeDataToFile } = require("../utils");

const filePath = path.join("data", "products.json");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === Number(id));

    resolve(product);
  });
}

function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { id: products.length + 1, ...product };
    products.push(newProduct);

    writeDataToFile(filePath, products);
    resolve(newProduct);
  });
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === Number(id));
    products[index] = { id: Number(id), ...product };

    writeDataToFile(filePath, products);
    resolve(products[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    const updatedProducts = products.filter((p) => p.id !== Number(id));

    writeDataToFile(filePath, updatedProducts);
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
