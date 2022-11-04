const express = require("express");
const { createAMatch } = require("../controllers/match");

const matchRouter = express.Router();

matchRouter.post("/", createAMatch);

module.exports = matchRouter;
