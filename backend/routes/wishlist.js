const express = require("express");

const {
  createNewWishlist,
  getWishlistById,
  deleteProductFromWishlistById,
} = require("../controllers/wishlist");

const wishlistRouter = express.Router();

wishlistRouter.post("/", createNewWishlist);
wishlistRouter.get("/", getWishlistById);
wishlistRouter.delete("/:id", deleteProductFromWishlistById);

module.exports = wishlistRouter;

console.log("test");
//aa
