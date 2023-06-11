const path = require("path");

module.exports = {
  context: process.cwd(),
  // devtool: "none",
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve("dist"),
  },
};
