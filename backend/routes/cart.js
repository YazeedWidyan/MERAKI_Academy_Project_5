const express = require("express");

const cartRouter = express.Router();

cartRouter.post("/");
cartRouter.get("/");
cartRouter.delete("/");

module.exports = cartRouter;
