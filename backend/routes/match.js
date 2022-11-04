const express = require("express");
const { createAMatch, getAllMatches } = require("../controllers/match");

const matchRouter = express.Router();

matchRouter.post("/", createAMatch);
matchRouter.get("/", getAllMatches);

module.exports = matchRouter;

//aa
