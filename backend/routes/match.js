const express = require("express");
const {
  createAMatch,
  getAllMatches,
  updateAMatchById,
} = require("../controllers/match");

const matchRouter = express.Router();

matchRouter.post("/", createAMatch);
matchRouter.get("/", getAllMatches);
matchRouter.put("/:id", updateAMatchById);

module.exports = matchRouter;

//aa
