const { pool } = require("../models/db");
const addToCart = (req, res) => {
  const { product_id } = req.body;
  const  user_id = req.token.user_id;
  const data = [user_id, product_id];
  const query =
    "INSERT INTO carts (user_id, product_id) VALUES($1,$2) RETURNING *;";
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Success cart created",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};
const getAllCartItems = (req, res) => {
  const id = req.token.user_id;
  const data = [id];
  const query =
    "SELECT * FROM carts INNER JOIN products ON carts.product_id = product.id WHERE carts.user_id = $1";
  pool.query(query, data).then((result) => {
    res
      .status(201)
      .json({
        success: true,
        message: "All the cart products",
        result: result.rows,
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error",
          err,
        });
      });
  });
};
const deleteProductFromCart = (req, res) => {
  const id = req.params.id;
  const data = [id];
  const query = "DELETE FROM carts WHERE id = $1";
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Product deleted form Cart",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err,
      });
    });
};

module.exports = {
  addToCart,
  getAllCartItems,
  deleteProductFromCart,
};
