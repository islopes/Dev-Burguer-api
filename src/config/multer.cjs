const multer = require("multer");
const { resolve } = require("node:path");
const { v4 } = require("uuid");

module.exports = {
  Storage: multer.diskStorage({
    destination: resolve(__dirname, "..", "uploads"),
    filename: (_request, file, Callback) => {
      const uniqueName = v4().concat(`-${file.originalname}`);
      return Callback(null, uniqueName);
    },
  }),
};
