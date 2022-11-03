const express = require("express");

const {
  createNewWishlist,
  getWishlistById,
} = require("../controllers/wishlist");

const wishlistRouter = express.Router();

wishlistRouter.post("/", createNewWishlist);
wishlistRouter.get("/", getWishlistById);

module.exports = wishlistRouter;

console.log("test");
