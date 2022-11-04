const express = require("express");

const productRouter = express.Router();

productRouter.post("/");
productRouter.get("/");
productRouter.put("/");
productRouter.delete("/");

module.exports = productRouter;
//a
