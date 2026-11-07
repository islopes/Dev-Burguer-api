const express = require("express");
const { resolve } = require("node:path");

const fileRoutes = express.Router();

fileRoutes.use(express.static(resolve(__dirname, "..", "..", "uploads")));

module.exports = fileRoutes;
