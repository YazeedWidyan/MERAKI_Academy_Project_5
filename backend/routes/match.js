const express = require("express");
const {
  createAMatch,
  getAllMatches,
  updateAMatchById,
  deleteAMatchById,
} = require("../controllers/match");

const matchRouter = express.Router();
console.log("aa");
console.log("asdas");
matchRouter.post("/", createAMatch);
matchRouter.get("/", getAllMatches);
matchRouter.get("/number/:id", getAllMatches);
matchRouter.put("/:id", updateAMatchById);
matchRouter.delete("/:id", deleteAMatchById);

module.exports = matchRouter;

//aa
