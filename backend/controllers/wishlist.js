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

const getWishlistById = (req, res) => {
  const id = req.token.userId;

  const query =
    "SELECT * FROM wishlists INNER JOIN products ON wishlists.product_id = products.id WHERE wishlists.user_id = $1";

  const data = [id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length == 0) {
        return res.status(404).json({
          success: false,
          message: "The wishlist is not found",
        });
      }
      res.status(201).json({
        success: true,
        message: `The Wishlist with user id ${id}`,
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

module.exports = { createNewWishlist, getWishlistById };
