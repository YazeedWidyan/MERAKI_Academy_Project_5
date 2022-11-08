const express = require("express");
const authentication = require("../middlewares/authentication");
const {
  addToCart,
  getAllCartItems,
  deleteProductFromCart,
  emptyCartByUserId,
} = require("../controllers/cart");
const cartRouter = express.Router();

cartRouter.post("/", authentication, addToCart);
cartRouter.get("/", authentication, getAllCartItems);
cartRouter.delete("/:id", authentication, deleteProductFromCart);
cartRouter.delete("/", authentication, emptyCartByUserId);

module.exports = cartRouter;
