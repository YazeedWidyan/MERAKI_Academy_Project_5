const express = require("express");

const orderRouter = express.Router();

orderRouter.post("/");
orderRouter.get("/");
orderRouter.put("/");
orderRouter.delete("/");

module.exports = orderRouter;

//a
