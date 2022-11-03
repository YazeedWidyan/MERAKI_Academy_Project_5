const express = require("express");

const { createNewWishlist } = require("../controllers/wishlist");

const wishlistRouter = express.Router();

wishlistRouter.post("/", createNewWishlist);

module.exports = wishlistRouter;

console.log("test");
