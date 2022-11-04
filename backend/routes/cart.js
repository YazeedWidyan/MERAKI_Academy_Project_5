const express = require("express");
const {
  addToCart,
  getAllCartItems,
  deleteProductFromCart,
} = require("../controllers/cart");
const cartRouter = express.Router();

cartRouter.post("/", addToCart);
cartRouter.get("/", getAllCartItems);
cartRouter.delete("/:id", deleteProductFromCart);
console.log('role');

module.exports = cartRouter;
//a
