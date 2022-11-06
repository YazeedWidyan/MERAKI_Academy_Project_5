const express = require("express");
const authentication = require("../middlewares/authentication");
const {
  addToCart,
  getAllCartItems,
  deleteProductFromCart,
} = require("../controllers/cart");
const cartRouter = express.Router();

cartRouter.post("/", authentication, addToCart);
cartRouter.get("/", authentication, getAllCartItems);
cartRouter.delete("/:id", deleteProductFromCart);
console.log("role");

module.exports = cartRouter;
console.log('test');
//a
