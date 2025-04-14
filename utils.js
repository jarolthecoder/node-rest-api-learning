const fs = require("node:fs");
const { resolve } = require("node:path");

/**
 * Utility function to send a JSON body response with a specified status code and headers.
 * 
 * @param {object} res - The response object from the HTTP request.
 * @param {number} statusCode - The HTTP status code to send. Defaults to 200.
 * @param {object} body - The JSON body to send in the response. Defaults to an empty object.
 * @param {object} headers - Additional headers to send in the response. Defaults to an empty object.
 */
function sendResponse(res, statusCode = 200, body = {}, headers = {}) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    ...headers,
  });
  res.end(JSON.stringify(body));
}

/**
 * Utility function to write data to a file using the fs module.
 * 
 * @param {string} filePath - The path to the file where data will be written.
 * @param {object} content - The content to write to the file.
 */
function writeDataToFile(filePath, content) {
  fs.writeFile(filePath, JSON.stringify(content, null, 2), "utf-8", (error) => {
    if (error) {
      console.log(error);
    }
  });
}

/**
 * Utility function to retrieve the POST data from the request body.
 * 
 * The function listens for the "data" event on the request object to accumulate the data chunks
 * and then resolves the promise with the complete data once the "end" event is emitted.
 *
 * @param {object} req - The request object from the HTTP request.
 * @return {Promise} - A promise that resolves with the POST data as a string.
 *                    If an error occurs, the promise is rejected with the error.
 */
function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => (body += chunk));

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  writeDataToFile,
  sendResponse,
  getPostData
};
