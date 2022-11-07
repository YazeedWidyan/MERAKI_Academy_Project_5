const express = require("express");

const {
  createNewWishlist,
  getWishlistById,
  deleteProductFromWishlistById,
} = require("../controllers/wishlist");
const authentication = require("../middlewares/authentication");

const wishlistRouter = express.Router();

wishlistRouter.post("/", authentication, createNewWishlist);
wishlistRouter.get("/", authentication, getWishlistById);
wishlistRouter.delete("/:id", authentication, deleteProductFromWishlistById);

module.exports = wishlistRouter;

console.log("test");
//aa
