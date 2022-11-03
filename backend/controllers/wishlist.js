const { pool } = require("../models/db");

// this function create new wishlist to user by user id

const createNewWishlist = (req, res) => {
  const { product_id } = req.body;
  const user_id = req.token.userId;

  const query = "INSERT INTO wishlists(product_id, user_id) VALUES ($1,$2)";

  const data = [product_id, user_id];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "The Wishlist has been created successfully",
        result: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "something went wrong",
        err: err.message,
      });
    });
};

module.exports = { createNewWishlist };
