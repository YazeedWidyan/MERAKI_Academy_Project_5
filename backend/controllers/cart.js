const { pool } = require("../models/db");
const addToCart = (req, res) => {
  // console.log(token);
  const { product_id } = req.body;
  console.log(req.token);
  const userId = req.token.userId;
  const data = [userId, product_id];
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
  const id = req.token.userId;
  const data = [id];
  console.log("cart", id);
  const query =
    "SELECT * FROM carts INNER JOIN products ON carts.product_id = products.id WHERE carts.user_id = $1";
  pool
    .query(query, data)
    .then((result) => {
      console.log(result);
      res.status(201).json({
        success: true,
        message: "All the cart products",
        result: result.rows,
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
const deleteProductFromCart = (req, res) => {
  console.log("abbas");
  const userId = req.token.userId;

  const id = req.params.id;
  const data = [id, userId];
  const query = "DELETE FROM carts WHERE product_id = $1 AND user_id = $2";
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

const emptyCartByUserId = (req, res) => {
  const id = req.token.userId;
  const data = [id];

  const query = `DELETE FROM carts WHERE user_id = $1`;
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "empty cart ",
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
  emptyCartByUserId,
};

console.log("test");
